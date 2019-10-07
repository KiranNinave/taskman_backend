const router = require("express").Router();

const loginRoutes = require("./loginRoutes");
const taskRoutes = require("./taskRoutes");

router.use("/login", loginRoutes);
router.use("/task", taskRoutes);

module.exports = router;
