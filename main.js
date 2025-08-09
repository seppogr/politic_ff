const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");


const errorController = require("./controllers/errorController");
const politiciansController = require("./controllers/politiciansController");
const usersController = require("./controllers/usersController");

const User = require("./models/user");


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
router.use(expressValidator());
router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});



passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("port", process.env.PORT || 3000);

app.use("/", router);

router.get("/", (req, res) => {
    res.send("Draft page");
});

// Poitician routes

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


// User routes
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.get("/users/usertest", usersController.test);

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);

router.get("/users/logout", usersController.logout, usersController.redirectView);

// router.get("/users/logout", (req, res) => {
//   req.logout(req.user, err => {
//     if(err) return next(err);
//     res.redirect("/users");
//   });
// });

router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);


// Error routes
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
app.listen(app.get("port"), () => {
    console.log(`Server running, listening to port: ${app.get("port")}`);
});