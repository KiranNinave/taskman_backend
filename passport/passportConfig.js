const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const jwtHelper = require("../helpers/jwtHelper");

exports.passport = {
    methods: {
        local: "local",
        jwt: "jwt"
    }
};

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: jwtHelper.JWT_SECRET
        },
        async (payload, done) => {
            // payload contain user id
            try {
                const user = await User.findById(payload.sub)
                    .populate("role")
                    .populate("team");
                if (!user) {
                    // 401 user not found
                    return done(null, false);
                }
                done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);

// local strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            // finding user using email
            try {
                const user = await User.findOne({
                    email
                })
                    .populate("role")
                    .populate("team");
                if (!user || !(await user.isValidPassword(password))) {
                    // user not found or invalid password
                    return done(null, false);
                }
                done(null, user);
            } catch (err) {
                done(err, false);
            }
        }
    )
);
