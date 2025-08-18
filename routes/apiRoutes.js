const router = require("express").Router();
const politiciansController = require("../controllers/politiciansController");

router.get("/politicians", politiciansController.index, politiciansController.respondJSON);
router.get("/politicians/userpoliticians", politiciansController.index, politiciansController.filterUserPoliticians,  politiciansController.respondJSON);
router.get("/politicians/:id/pick", politiciansController.joinTeam, politiciansController.respondJSON);
router.use(politiciansController.errorJSON);



module.exports = router;