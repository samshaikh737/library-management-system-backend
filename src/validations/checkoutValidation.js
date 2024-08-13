const Joi = require('joi');

const validateCreateCheckout = (data) => {
    const schema = Joi.object({
        branchId: Joi.number().integer().required(),
        userId: Joi.number().integer().required(),
        bookId: Joi.number().integer().required(),
        checkoutDate: Joi.date().required(),
        returnDate: Joi.date().optional(),
        status: Joi.string().valid('checked_out', 'returned').required()
    });
    return schema.validate(data);
};

const validateUpdateCheckout = (data) => {
    const schema = Joi.object({
        returnDate: Joi.date().optional(),
        status: Joi.string().valid('checked_out', 'returned').optional()
    });
    return schema.validate(data);
};

module.exports = {
    validateCreateCheckout,
    validateUpdateCheckout
};
