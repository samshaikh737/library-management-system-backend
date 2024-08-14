const userService = require('../services/userService');
const { validateCreateUser, validateUpdateUser } = require('../validations/userValidation');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../middleware/asyncHandler');

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const filters = req.query; // Extract filters from query parameters
        const users = await userService.getAllUsers(filters);
        res.status(200).json(users);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const createUser = asyncHandler(async (req, res) => {
    try {
        const { error } = validateCreateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const updateUser = asyncHandler(async (req, res) => {
    try {
        const { error } = validateUpdateUser(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
