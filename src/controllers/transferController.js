const transferService = require('../services/transferService');
const ApiError = require('../utils/ApiError');
const { validateCreateTranfer } = require('../validations/transferValidation');
const asyncHandler = require('../middleware/asyncHandler');

const getAllTransfers = asyncHandler(async (req, res) => {
    try {
        const filters = req.query;
        const transfers = await transferService.getAllTransfers(filters);
        res.status(200).json(transfers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const createTransfer = asyncHandler(async (req, res) => {
    try {
        const { error } = validateCreateTranfer(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const transfer = await transferService.createTransfer(req.body);
        res.status(201).json(transfer);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const updateTransfer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = validateCreateTranfer(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const transfer = await transferService.updateTransfer(id, req.body);
        res.status(200).json(transfer);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

const deleteTransfer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await transferService.deleteTransfer(id);
        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

module.exports = {
    getAllTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
};
