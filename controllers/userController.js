const User = require("../models/user");
const Role = require("../models/role");
const Team = require("../models/team");
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
        const { team } = req.body;
        const isTeamExists = await Team.findOne({ _id: team });
        if (!isTeamExists)
            return res.sendNotFoundWithMessage({ message: "Team not found" });
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
        const { team } = req.body;
        const isTeamExists = await Team.findOne({ _id: team });
        if (!isTeamExists)
            return res.sendNotFoundWithMessage({ message: "Team not found" });
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

exports.getUser = async (req, res) => {
    try {
        const users = await User.find({})
            .populate("role")
            .populate("team");
        res.json(users);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId })
            .populate("team")
            .populate("role");
        if (!user) return res.sendNotFound();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const userId = req.params.id;
        if (!firstName)
            return res.status(400).json({ message: "firstName required" });
        if (!lastName)
            return res.status(400).json({ message: "lastName required" });
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName
        });
        if (!updatedUser) return res.sendNotFound();
        const updatedUserWithRoleAndTeam = await User.findById(updatedUser._id)
            .populate("role")
            .populate("team");
        res.json(updatedUserWithRoleAndTeam);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId)
            .populate("role")
            .populate("team");
        if (!deletedUser) return res.sendNotFound();
        res.json(deletedUser);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
