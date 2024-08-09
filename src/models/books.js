const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Ensure title is unique
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currentBranch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'checked_out', 'reserved'), // Status values in lowercase
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        unique: true, // Ensure ISBN is unique
        allowNull: false
    }
});

module.exports = Book;
