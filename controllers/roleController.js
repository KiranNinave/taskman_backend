const Role = require("../models/role");

exports.addRole = async (req, res) => {
    try {
        const role = new Role({
            type: req.body.type
        });
        await role.save();
        res.sendCreated(role);
    } catch (err) {
        console.log(err);
        res.sendServerError();
    }
};
