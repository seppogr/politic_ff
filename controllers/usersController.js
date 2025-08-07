const user = require("../models/user");


const User = require("../models/user"),
    getUserParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last,
                nick: body.nick
            },
           // team: body.team,
            password: body.password
        };
    };

module.exports = {

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

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

    new: (req, res) => {
        res.render("users/new");
    },

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

    indexView: (req, res) => {
        res.render("users/index", {
            flashMessages: {
                loaded: "Nämä käyttäjät löytyivät."
            }
        });
    },

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
    showView: (req, res) => {
        res.render("users/show");
    },

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

    test: (req, res) => {
        res.render("users/usertest");
    }
}