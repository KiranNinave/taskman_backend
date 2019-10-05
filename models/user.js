const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role",
            require: true
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team",
            required: true
        },
        isValid: {
            type: Boolean,
            require: true,
            default: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
