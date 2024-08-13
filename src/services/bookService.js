const { Op } = require('sequelize');
const Book = require('../models/books');
const ApiError = require('../utils/ApiError');

const getAllBooks = async (filters = {}) => {
    try {
        return await Book.findAll({ where: filters });
    } catch (error) {
        throw new ApiError(500, 'Unable to retrieve books', true, error.stack);
    }
};

const getBookById = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        return book;
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

const createBook = async (bookData) => {
    try {
        return await Book.create(bookData);
    } catch (error) {
        throw new ApiError(500, error.errors.map(d => d.message).join(', '));
    }
};

const updateBook = async (id, bookData) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        return await book.update(bookData);
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

const deleteBook = async (id) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new ApiError(404, 'Book not found');
        }
        await book.destroy();
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
