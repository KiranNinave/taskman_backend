const User = require("../models/user");
const Role = require("../models/role");
const userFunctions = require("./functions/userFunctions");
const jwtHelper = require("../helpers/jwtHelper");

exports.loginAdmin = async (req, res) => {
    if (req.user.role.type !== "admin")
        return res.sendUnAuthorized({ message: "Unauthorized" });
    const token = jwtHelper.generateToken(req.user);
    res.json({
        token,
        user: req.user
    });
};

exports.loginUser = async (req, res) => {
    if (req.user.role.type !== "user")
        return res.sendUnAuthorized({ message: "Unauthorized" });
    const token = jwtHelper.generateToken(req.user);
    res.json({
        token,
        user: req.user
    });
};

exports.addUser = async (req, res) => {
    try {
        const newUserWithRole = await userFunctions.createUser(
            userFunctions.users.types.user,
            req.body
        );
        res.sendCreated(newUserWithRole);
    } catch (err) {
        console.log(err);
        if (err.message === userFunctions.users.exceptions.userExists) {
            return res.sendAlreadyExists({ message: err.message });
        }
        res.sendServerError();
    }
};

exports.addAdmin = async (req, res) => {
    try {
        const newAdminWithRole = await userFunctions.createUser(
            userFunctions.users.types.admin,
            req.body
        );
        res.sendCreated(newAdminWithRole);
    } catch (err) {
        console.log(err);
        if (err.message === userFunctions.users.exceptions.userExists) {
            return res.sendAlreadyExists({ message: err.message });
        }
        res.sendServerError();
    }
};
