const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transfer = sequelize.define('Transfer', {
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Books',
            key: 'id',
        },
        allowNull: false,
    },
    fromBranchId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Branches',
            key: 'id',
        },
        allowNull: false,
    },
    toBranchId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Branches',
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transferDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Transfers' // Specify the table name
});

module.exports = Transfer;
