const router = require("express").Router();
const politicianRoutes = require("./politicianRoutes");
const userRoutes = require("./userRoutes");
const apiRoutes = require("./apiRoutes");
const errorRoutes = require("./errorRoutes");

router.use("/politicians", politicianRoutes);
router.use("/users", userRoutes);
router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;
