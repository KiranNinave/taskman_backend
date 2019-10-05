const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        status: {
            type: String,
            enum: ["white", "yellow", "green", "red"],
            default: "white",
            required: true
        },
        startDate: {
            type: Number,
            required: true
        },
        endDate: {
            type: Number,
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

module.exports = mongoose.model("task", taskSchema);
