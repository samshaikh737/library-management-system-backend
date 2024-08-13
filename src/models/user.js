const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('librarian', 'member'),
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
});

module.exports = User;
