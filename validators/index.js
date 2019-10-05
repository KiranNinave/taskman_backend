const Joi = require("@hapi/joi");
const roleValidator = require("./roleValidator");
const userValidator = require("./userValidator");
const loginValidator = require("./loginValidator");
const workspaceValidator = require("./workspaceValidator");
const projectValidator = require("./projectValidator");
const taskValidator = require("./taskValidator");
const teamValidator = require("./teamValidator");

module.exports = {
    validateBody: schema => (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.sendBadRequest(result.error);
        }
        next();
    },
    schemas: {
        roleValidator,
        userValidator,
        loginValidator,
        workspaceValidator,
        projectValidator,
        taskValidator,
        teamValidator
    }
};
