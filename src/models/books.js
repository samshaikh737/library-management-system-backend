const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true // Ensure title is unique
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
    branchId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Branches',
            key: 'id'
        },
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('available', 'checked_out', 'reserved'), // Status values in lowercase
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        // unique: true, // Ensure ISBN is unique
        allowNull: false
    }
}, {
    tableName: 'Books' // Specify the table name
});

module.exports = Book;
