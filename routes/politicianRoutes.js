const router = require("express").Router();
const politiciansController = require("../controllers/politiciansController");


router.get("/", politiciansController.index, politiciansController.indexView);
router.get("/:party/showParty", politiciansController.showParty, politiciansController.indexView);
router.get("/:status/showStatus", politiciansController.showStatus, politiciansController.indexView);
router.get("/:power/showPower", politiciansController.showPower, politiciansController.indexView);
router.get("/new", politiciansController.new);

router.post("/searchLastName", politiciansController.showSearchLastName, politiciansController.indexView);
router.post("/searchPlayerName", politiciansController.showSearchPlayer, politiciansController.indexView);

router.post("/create", politiciansController.create, politiciansController.redirectView);
router.get("/:id", politiciansController.show, politiciansController.showView);
router.get("/:id/edit", politiciansController.edit);
router.put("/:id/update", politiciansController.update, politiciansController.redirectView);
router.get("/:id/pick", politiciansController.pick);
router.put("/:id/choose", politiciansController.choose, politiciansController.redirectView);
router.delete("/:id/delete", politiciansController.delete, politiciansController.redirectView);

module.exports = router;
