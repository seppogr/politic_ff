const user = require("../models/user");

// Set user parameters into a variable for future reference and use
const User = require("../models/user"),
    getUserParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last,
                nick: body.nick
            },
            team: body.team,
            password: body.password,
            email: body.email
        };
    };

module.exports = {
// Create new user
    create: (req, res, next) => {
            let userParams = getUserParams(req.body);
            User.create(userParams)
            .then(user => {
                req.flash("success", `${user.fullName}'s data created succesfully`);
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`CREATE error saving user: ${error.message}`);
                res.locals.redirect = "/users/new";
                req.flash("error", `Failed to create user: ${error.message}`);
                next();
            });
        },

// Show a given view, read from the res.locals.redirect defined by previous action
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

// Render users/new.ejs into view
    new: (req, res) => {
        res.render("users/new");
    },

// Fetch all users from the database
    index: (req, res, next) => {
        User.find()
                .then(users => {
                    res.locals.users = users;
                    next();
                })
                .catch(error => {
                    console.log(`INDEX error fetching users: ${error.message}`);
                    next(error);
                })
    },
// Render all defined (by search) users friom the database
    indexView: (req, res) => {
        res.render("users/index", {
            flashMessages: {
                loaded: "Nämä käyttäjät löytyivät."
            }
        });
    },

// Fetch single user data from database
    show: (req, res, next) => {
        var userId = req.params.id;
                User.findById(userId)
                .then(user => {
                    res.locals.user = user;
                    next();
                })
                .catch(error => {
                    console.log(`SHOW error fetching user by Id: ${error.message}`);
                    next(error);
                });
    },

// Render "users/show.ejs" into view
    showView: (req, res) => {
        res.render("users/show");
    },

// fetch user data from database so it can be edited
   edit: (req, res, next) => {
           var userId = req.params.id;
           User.findById(userId)
           .then(user => {
               res.render("users/edit", {
                   user: user
               });
           })
           .catch(error => {
               console.log(`EDIT error fetching user by id: ${error.message}`);
               next(error);
           });
       },

// Write the updated data into database
    update: (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);

            User.findByIdAndUpdate(userId, {
                $set: userParams,
            })
            .then(user => {
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`UPDATE error updating user by id: ${error.message}`);
                next(error);
            });
    },
// Remove a user from database
     delete: (req, res, next) => {
            let userId = req.params.id;
            User.findByIdAndDelete(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`DELETE error deleting user by id: ${error.message}`);
                next(error);
            });
        },

    login: (req, res) => {
        res.render("users/login");
    },

    authenticate: (req, res, next) => {

        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                user.passwordComparison(req.body.password)
                .then(passwordsMatch => {
                    if (passwordsMatch) {
                        res.locals.redirect = `/users/${user._id}`;
                        req.flash("success", `${user.fullName} sisäänkirjautuminen onnistui!`);
                        res.locals.user = user;
                    } else {
                        req.flash("error", "Väärä salasana!");
                        res.locals.redirect = "/users/login";
                    }
                    next();
                });
            } else {
                req.flash("error", "Käyttäjätiliä ei löydy!");
                res.locals.redirect = "/users/login";
                next();
            }
        })
        .catch(error => {
            console.log(`AUTHENTICATE error in user ${user.fullname}`);
            next(error);
        });
    },
// Render a test page, used for quick testing only
    test: (req, res) => {
        res.render("users/usertest");
    }
}