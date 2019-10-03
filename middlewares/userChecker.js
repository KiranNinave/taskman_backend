exports.users = {
    types: {
        user: "user",
        admin: "admin"
    }
};

exports.checkUser = (type = this.users.types.user) => (req, res, next) => {
    if (req.user.role.type !== type) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
