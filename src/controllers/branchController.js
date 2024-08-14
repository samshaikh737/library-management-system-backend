const branchService = require('../services/branchService');
const { validateCreateBranch, validateUpdateBranch } = require('../validations/branchValidation');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');
const asyncHandler = require('../middleware/asyncHandler');

const getAllBranches = asyncHandler(async (req, res) => {
    try {
        // Extract query parameters
        const { name,city, state, zipCode, address } = req.query;

        // Build filter object
        const filters = {};
        if (name) filters.name = { [Op.iLike]: `%${name}%` }; 
        if (city) filters.city = { [Op.iLike]: `%${city}%` }; 
        if (state) filters.state = { [Op.iLike]: `%${state}%` }; 
        if (address) filters.address = { [Op.iLike]: `%${address}%` }; 
        if (zipCode) filters.zipCode = { [Op.iLike]: `%${zipCode}%` }; 


        const branches = await branchService.getAllBranches(filters);
        res.status(200).json(branches);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const getBranchById = asyncHandler(async (req, res) => {
    try {
        const branch = await branchService.getBranchById(req.params.id);
        res.status(200).json(branch);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const createBranch = asyncHandler(async (req, res) => {
    try {
        const { error } = validateCreateBranch(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const newBranch = await branchService.createBranch(req.body);
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const updateBranch =  asyncHandler(async (req, res) => {
    try {
        const { error } = validateUpdateBranch(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const updatedBranch = await branchService.updateBranch(req.params.id, req.body);
        res.status(200).json(updatedBranch);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const deleteBranch = asyncHandler(async (req, res) => {
    try {
        await branchService.deleteBranch(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
