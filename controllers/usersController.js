

const User = require("../models/user"),
    getUserParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last,
                nick: body.nick
            },
            team: body.team,
            password: body.password
        };
    };

module.exports = {

    create: (req, res, next) => {
            let userParams = getUserParams(req.body);
            User.create(userParams)
            .then(user => {
                req.flash("success", `${user.fullName}'s data created succesfully`);
                res.locals.redirect = "/users/usertest";
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
      test: (req, res) => {
        res.render("users/usertest");
    }
}