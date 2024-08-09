const Joi = require('joi');

const validateCreateBranch = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        phone: Joi.string().optional()
    });
    return schema.validate(data);
};

const validateUpdateBranch = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
        phone: Joi.string()
    });
    return schema.validate(data);
};

module.exports = {
    validateCreateBranch,
    validateUpdateBranch
};
