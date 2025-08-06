const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

const errorController = require("./controllers/errorController");
const politiciansController = require("./controllers/politiciansController");


const app = express();
const router = express.Router();
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/politiciandraft");


app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.set("port", process.env.PORT || 3000);

app.use("/", router);

router.get("/", (req, res) => {
    res.send("Draft page");
});



router.get("/politicians", politiciansController.index, politiciansController.indexView);
router.get("/politicians/:party/showParty", politiciansController.showParty, politiciansController.indexView);
router.get("/politicians/:status/showStatus", politiciansController.showStatus, politiciansController.indexView);
router.get("/politicians/:power/showPower", politiciansController.showPower, politiciansController.indexView);
router.get("/politicians/new", politiciansController.new);

router.post("/politicians/searchLastName", politiciansController.showSearchLastName, politiciansController.indexView);
router.post("/politicians/searchPlayerName", politiciansController.showSearchPlayer, politiciansController.indexView);

router.post("/politicians/create", politiciansController.create, politiciansController.redirectView);
router.get("/politicians/:id", politiciansController.show, politiciansController.showView);
router.get("/politicians/:id/edit", politiciansController.edit);
router.put("/politicians/:id/update", politiciansController.update, politiciansController.redirectView);
router.get("/politicians/:id/pick", politiciansController.pick);
router.put("/politicians/:id/choose", politiciansController.choose, politiciansController.redirectView);
router.delete("/politicians/:id/delete", politiciansController.delete, politiciansController.redirectView);






app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
app.listen(app.get("port"), () => {
    console.log(`Server running, listening to port: ${app.get("port")}`);
});