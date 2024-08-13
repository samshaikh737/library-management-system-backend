const Joi = require('joi');

const validateCreateTranfer = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        fromBranchId: Joi.number().integer().required(),
        toBranchId: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required()
    });
    return schema.validate(data);
};



module.exports = {
    validateCreateTranfer,
};
