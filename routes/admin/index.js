const app = require("express");
const loginRoutes = require("./loginRoutes");
const roleRoutes = require("./roleRoutes");
const userRouters = require("./userRoutes");
const adminRoutes = require("./adminRoutes");

const router = app.Router();

router.use("/login", loginRoutes);
router.use("/role", roleRoutes);
router.use("/user", userRouters);
router.use("/admin", adminRoutes);

module.exports = router;
