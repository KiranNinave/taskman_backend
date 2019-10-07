const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "workspace",
            required: true
        },
        method: {
            type: String,
            enum: ["team", "user"],
            required: true
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
