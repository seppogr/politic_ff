const express = require("express");
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");


const router = require("./routes/index");
const User = require("./models/user");


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/politiciandraft");


app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));



app.use(connectFlash());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
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

// router.get("/", (req, res) => {
//     res.send("Draft page");
// });


app.listen(app.get("port"), () => {
    console.log(`Server running, listening to port: ${app.get("port")}`);
});