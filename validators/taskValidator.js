const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    project: Joi.string().required(),
    startDate: Joi.number()
        .min(new Date().getTime() - 3656803) // one hour back
        .required(),
    endDate: Joi.number()
        .min(new Date().getTime()) // minimum end time should be one hour+
        .required(),
    method: Joi.string()
        .valid(["team", "user"])
        .required(),
    worker: Joi.string().required()
});
