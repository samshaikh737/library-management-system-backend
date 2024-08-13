const Joi = require('joi');

const validateCreateBook = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        genre: Joi.string().valid('fiction', 'non-fiction', 'fantasy', 'mystery', 'thriller', 'romance', 'historical', 'science-fiction').required(),
        quantity: Joi.number().integer().min(1).required(),
        currentBranch: Joi.string().required(),
        branchId: Joi.number().integer().required(),
        status: Joi.string().valid('available', 'checked_out', 'reserved').required(),
        isbn: Joi.string().required()
    });
    return schema.validate(data);
};

const validateUpdateBook = (data) => {
    const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        genre: Joi.string().valid('fiction', 'non-fiction', 'fantasy', 'mystery', 'thriller', 'romance', 'historical', 'science-fiction'),
        quantity: Joi.number().integer().min(1),
        currentBranch: Joi.string(),
        branchId: Joi.number().integer(),
        status: Joi.string().valid('available', 'checked_out', 'reserved'),
        isbn: Joi.string()
    });
    return schema.validate(data);
};

module.exports = {
    validateCreateBook,
    validateUpdateBook
};
