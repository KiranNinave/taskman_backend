const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    project: Joi.string().required(),
    user: Joi.string().required(),
    startDate: Joi.number().required(),
    endDate: Joi.number().required()
});
