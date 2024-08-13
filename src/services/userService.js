const User = require('../models/user');
const Branch = require('../models/branch');

const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const getAllUsers = async (filters = {}) => {
    const { name, email, phone, role,branchId } = filters;

    // Build query object for filtering
    const query = {};
    if (name) query.name = { [Op.iLike]: `%${name}%` };
    if (email) query.email = { [Op.iLike]: `%${email}%` };
    if (phone) query.phone = { [Op.iLike]: `%${phone}%` };
    if (role) query.role = role;
    if (branchId) query.branchId = branchId;

    return User.findAll({
        where: query, 
        include: [
            { model: Branch, attributes: ['id', 'name'] },
        ],
    });
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return user;
};

const createUser = async (userData) => {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
        throw new ApiError(400, 'Email already in use');
    }
    return User.create(userData);
};

const updateUser = async (id, userData) => {
    const user = await getUserById(id);
    return user.update(userData);
};

const deleteUser = async (id) => {
    const user = await getUserById(id);
    return user.destroy();
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
