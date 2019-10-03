const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required()
});
