const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.get("/usertest", usersController.test);

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);

router.get("/logout", usersController.logout, usersController.redirectView);
router.post("/create", usersController.create, usersController.redirectView); //usersController.validate otettu pois, pitää säätää sitä vielä
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;