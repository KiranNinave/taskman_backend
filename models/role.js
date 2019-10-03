const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ["admin", "user"], required: true }
    },
    {
        timestamps: true
    }
);

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
