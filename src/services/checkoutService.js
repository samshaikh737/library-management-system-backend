const { Checkout, User, Book } = require('../models');
const ApiError = require('../utils/ApiError');

const { Op } = require('sequelize');

const applyFilters = (query, filters) => {
    // Ensure the `where` clause is initialized
    query.where = query.where || {};

    if (filters.userId) {
        query.where.userId = filters.userId;
    }
    if (filters.bookId) {
        query.where.bookId = filters.bookId;
    }
    if (filters.status) {
        query.where.status = filters.status;
    }
    if (filters.startDate && filters.endDate) {
        query.where.checkoutDate = {
            [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
        };
    }

    return query;
};

const getAllCheckouts = async (filters = {}) => {
    try {
        const query = {
            include: [
                { model: User, attributes: ['id', 'name'] },
                { model: Book, attributes: ['id', 'title', 'author'] }
            ],
            where: {}
        };

        // Apply filters
        const filteredQuery = applyFilters(query, filters);

        const checkouts = await Checkout.findAll(filteredQuery);

        if (!checkouts.length) {
            throw new ApiError(404, 'No checkouts found');
        }

        return checkouts;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

const getCheckoutById = async (id) => {
    try {
        const checkout = await Checkout.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'name'] },
                { model: Book, attributes: ['id', 'title', 'author'] }
            ]
        });

        if (!checkout) {
            throw new ApiError(404, 'Checkout not found');
        }

        return checkout;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
const createCheckout = async (data) => {
    try {
        const { userId, bookId, checkoutDate, returnDate, status } = data;

        // Check if the user and book exist
        const user = await User.findByPk(userId);
        const book = await Book.findByPk(bookId);

        if (!user || !book) {
            throw new ApiError(400, 'User or Book not found');
        }

        // Check if the book is available
        if (book.quantity <= 0) {
            throw new ApiError(400, 'Book is not available');
        }

        // Decrement the book quantity
        await book.update({ quantity: book.quantity - 1 });

        // Create the new checkout record
        const newCheckout = await Checkout.create({
            userId,
            bookId,
            checkoutDate,
            returnDate,
            status
        });

        return newCheckout;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};


const updateCheckout = async (id, data) => {
    try {
        const checkout = await Checkout.findByPk(id);

        if (!checkout) {
            throw new ApiError(404, 'Checkout not found');
        }

        await checkout.update(data);
        return checkout;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
const returnBook = async (checkoutId) => {
    const checkout = await Checkout.findByPk(checkoutId);
    if (!checkout) {
        throw new Error('Checkout record not found');
    }

    const book = await Book.findByPk(checkout.bookId);
    if (!book) {
        throw new Error('Book not found');
    }

    await book.update({ quantity: book.quantity + 1 });

    // Proceed with updating the checkout record
    await checkout.update({ status: 'returned' });
};

const deleteCheckout = async (id) => {
    try {
        const checkout = await Checkout.findByPk(id);

        if (!checkout) {
            throw new ApiError(404, 'Checkout not found');
        }

        await checkout.destroy();
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

module.exports = {
    getAllCheckouts,
    getCheckoutById,
    createCheckout,
    updateCheckout,
    returnBook,
    deleteCheckout
};
