const Joi = require('joi');

const validateCreateUser = (userData) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().optional(),
        branchId: Joi.number().optional(),
        role: Joi.string().valid('librarian', 'member').required()
    });
    return schema.validate(userData);
};

const validateUpdateUser = (userData) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        branchId: Joi.number().optional(),
        role: Joi.string().valid('librarian', 'member').optional()
    });
    return schema.validate(userData);
};

module.exports = {
    validateCreateUser,
    validateUpdateUser
};
