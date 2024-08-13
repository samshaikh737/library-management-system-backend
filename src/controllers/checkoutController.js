const checkoutService = require('../services/checkoutService');
const { validateCreateCheckout, validateUpdateCheckout } = require('../validations/checkoutValidation');
const ApiError = require('../utils/ApiError');

const getAllCheckouts = async (req, res) => {
    try {
        const filters = req.query; // Extract query parameters for filtering
        const checkouts = await checkoutService.getAllCheckouts(filters); // Ensure service method handles filters
        res.status(200).json(checkouts);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getCheckoutById = async (req, res) => {
    try {
        const checkout = await checkoutService.getCheckoutById(req.params.id);
        res.status(200).json(checkout);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const createCheckout = async (req, res) => {
    try {
        const { error } = validateCreateCheckout(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const newCheckout = await checkoutService.createCheckout(req.body);
        res.status(201).json(newCheckout);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const updateCheckout = async (req, res) => {
    try {
        const { error } = validateUpdateCheckout(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const updatedCheckout = await checkoutService.updateCheckout(req.params.id, req.body);
        res.status(200).json(updatedCheckout);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};
const returnCheckout = async (req, res) => {
    try {
        const { error } = validateUpdateCheckout(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        await checkoutService.returnBook(req.params.id, req.body.returnDate);
        res.status(200).json({ message: "Return successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};
const deleteCheckout = async (req, res) => {
    try {
        await checkoutService.deleteCheckout(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

module.exports = {
    getAllCheckouts,
    getCheckoutById,
    createCheckout,
    updateCheckout,
    returnCheckout,
    deleteCheckout
};
