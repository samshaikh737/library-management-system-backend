const bookService = require('../services/bookService');
const { validateCreateBook, validateUpdateBook } = require('../validations/bookValidation');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getAllBooks = async (req, res) => {
    try {
        // Extract query parameters
        const { title, author, genre, currentBranch, status } = req.query;

        // Build filter object
        const filters = {};
        if (title) filters.title = { [Op.iLike]: `%${title}%` }; // Case-insensitive search
        if (author) filters.author = { [Op.iLike]: `%${author}%` }; // Case-insensitive search
        if (genre) filters.genre = genre.toLowerCase();
        if (currentBranch) filters.currentBranch = currentBranch;
        if (status) filters.status = status.toLowerCase();

        const books = await bookService.getAllBooks(filters);
        res.status(200).json(books);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        const { error } = validateCreateBook(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const newBook = await bookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const { error } = validateUpdateBook(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
