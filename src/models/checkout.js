const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Checkout = sequelize.define('Checkout', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    checkoutDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('checked_out', 'returned'),
        allowNull: false
    }
});

module.exports = Checkout;
