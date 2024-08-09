const Branch = require('../models/branch');
const ApiError = require('../utils/ApiError');

const getAllBranches = async (filters = {}) => {
    try {
        return await Branch.findAll({ where: filters });
    } catch (error) {
        throw new ApiError(500, 'Unable to retrieve branches', true, error.stack);
    }
};

const getBranchById = async (id) => {
    try {
        const branch = await Branch.findByPk(id);
        if (!branch) {
            throw new ApiError(404, 'Branch not found');
        }
        return branch;
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

const createBranch = async (branchData) => {
    try {
        return await Branch.create(branchData);
    } catch (error) {
        throw new ApiError(500, 'Unable to create branch', true, error.stack);
    }
};

const updateBranch = async (id, branchData) => {
    try {
        const branch = await Branch.findByPk(id);
        if (!branch) {
            throw new ApiError(404, 'Branch not found');
        }
        return await branch.update(branchData);
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

const deleteBranch = async (id) => {
    try {
        const branch = await Branch.findByPk(id);
        if (!branch) {
            throw new ApiError(404, 'Branch not found');
        }
        await branch.destroy();
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message, true, error.stack);
    }
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
