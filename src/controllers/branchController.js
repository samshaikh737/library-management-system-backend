const branchService = require('../services/branchService');
const { validateCreateBranch, validateUpdateBranch } = require('../validations/branchValidation');
const ApiError = require('../utils/ApiError');

const getAllBranches = async (req, res) => {
    try {
        // Extract query parameters
        const { city, state, zipCode } = req.query;

        // Build filter object
        const filters = {};
        if (city) filters.city = city;
        if (state) filters.state = state;
        if (zipCode) filters.zipCode = zipCode;

        const branches = await branchService.getAllBranches(filters);
        res.status(200).json(branches);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getBranchById = async (req, res) => {
    try {
        const branch = await branchService.getBranchById(req.params.id);
        res.status(200).json(branch);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const createBranch = async (req, res) => {
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
};

const updateBranch = async (req, res) => {
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
};

const deleteBranch = async (req, res) => {
    try {
        await branchService.deleteBranch(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
