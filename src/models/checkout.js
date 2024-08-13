const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Checkout = sequelize.define('Checkout', {
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Books',
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
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
