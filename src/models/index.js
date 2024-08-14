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

User.belongsTo(Branch, { foreignKey: 'branchId' });

Book.hasMany(Checkout, { foreignKey: 'bookId' });
Checkout.belongsTo(Book, { foreignKey: 'bookId' });
Checkout.belongsTo(Branch, { foreignKey: 'branchId' });

Branch.hasMany(Book, { foreignKey: 'branchId' });
Book.belongsTo(Branch, { foreignKey: 'branchId' });

Transfer.belongsTo(Branch, { as: 'fromBranch', foreignKey: 'fromBranchId' });
Transfer.belongsTo(Branch, { as: 'toBranch', foreignKey: 'toBranchId' });
Transfer.belongsTo(Book, { foreignKey: 'bookId' });

// Sync models (optional, use only in development)
// sequelize.sync({ force: true }).catch(() => null);

module.exports = {
    User,
    Book,
    Checkout,
    Branch,
    Reservation,
    Transfer,
    sequelize,
};
