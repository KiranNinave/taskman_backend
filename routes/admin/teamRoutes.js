const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport/passportConfig");
const userChecker = require("../../middlewares/userChecker");
const validator = require("../../validators/");
const teamController = require("../../controllers/teamController");

router
    .route("/")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        teamController.getTeam
    )
    .post(
        validator.validateBody(validator.schemas.teamValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        teamController.addTeam
    );

router
    .route("/:id")
    .get(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        teamController.getTeamById
    )
    .put(
        validator.validateBody(validator.schemas.teamValidator),
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        teamController.updateTeamById
    )
    .delete(
        passport.authenticate(passportConfig.passport.methods.jwt, {
            session: false
        }),
        userChecker.checkUser(userChecker.users.types.admin),
        teamController.deleteTeamById
    );

module.exports = router;
