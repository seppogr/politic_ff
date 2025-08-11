const router = require("express").Router();
const politicianRoutes = require("./politicianRoutes");
const userRoutes = require("./userRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/politicians", politicianRoutes);
router.use("/users", userRoutes);
router.use("/", errorRoutes);

module.exports = router;
