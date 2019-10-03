const User = require("../../models/user");
const Role = require("../../models/role");

exports.users = {
    types: {
        admin: "admin",
        user: "user"
    },
    exceptions: {
        userExists: "User already exists",
        serverError: "Server error"
    }
};

exports.createUser = async (type = "user", body = {}) => {
    try {
        const { firstName, lastName, email, password } = body;

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            throw new Error(this.users.exceptions.userExists);
        }

        const userRole = await Role.findOne({ type });
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role: userRole._id
        });
        await newUser.save();
        const newUserWithRole = await User.populate(newUser, [
            { path: "role" }
        ]);
        return newUserWithRole;
    } catch (err) {
        if (err.message === this.users.exceptions.userExists) {
            throw new Error(err.message);
        }
        throw new Error(this.users.exceptions.serverError);
    }
};
