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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        startDate: {
            type: Number,
            required: true
        },
        endDate: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("task", taskSchema);
