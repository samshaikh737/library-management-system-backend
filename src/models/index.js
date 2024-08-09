const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user');
const Book = require('./books');
const Checkout = require('./checkout');
const Branch = require('./branch');
const Reservation = require('./reservation');
const Transfer = require('./transfer');

// Define model associations
User.hasMany(Checkout, { foreignKey: 'userId' });
Checkout.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Checkout, { foreignKey: 'bookId' });
Checkout.belongsTo(Book, { foreignKey: 'bookId' });

Branch.hasMany(Book, { foreignKey: 'branchId' });
Book.belongsTo(Branch, { foreignKey: 'branchId' });

// Similarly, set up associations for Reservation and Transfer models if needed

// Sync models (optional, use only in development)
sequelize.sync();

module.exports = {
    User,
    Book,
    Checkout,
    Branch,
    Reservation,
    Transfer,
    sequelize
};
