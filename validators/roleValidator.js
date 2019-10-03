const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
    type: Joi.string()
        .valid(["admin", "user"])
        .required()
});
