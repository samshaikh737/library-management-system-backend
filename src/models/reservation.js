const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
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
    reservationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Reservation;
