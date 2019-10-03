const JWT = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not found in environmental variables");
}

exports.generateToken = (user = {}) => {
    return JWT.sign(
        {
            iss: "www.techzilla.com",
            sub: user._id,
            iat: new Date().getTime()
        },
        JWT_SECRET
    );
};

exports.JWT_SECRET = JWT_SECRET;
