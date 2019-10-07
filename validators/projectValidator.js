const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    workspace: Joi.string().required(),
    method: Joi.string()
        .valid(["team", "user"])
        .required(),
    worker: Joi.string().required()
});
