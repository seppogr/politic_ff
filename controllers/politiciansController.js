// Handle different actions and views when fetchin information
// from the Mongodb database
const httpStatus = require("http-status-codes");
const User = require("../models/user");
const politician = require("../models/politician");

// Fetch information from datbase and set it as variables
const Politician = require("../models/politician"),
    getPoliticianParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            party: body.party,
            power: body.power,
            status: body.status,
            player: body.player,
            points: {
                won: body.won,
                lost: body.lost
            },

            draft: {
                round: body.round,
                pickInRound: body.pickInRound,
                totalPick: body.totalPick
            },
        };
    };

// All associated actions are listed here

module.exports = {

// Fetch all politicians from the database
    index: (req, res, next) => {
        console.log("index");
        Politician.find()
        .then(politicians => {
            res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`INDEX error fetching politicians: ${error.message}`);
            next(error);
        })
    },

// Render a view of all fetched politicians by "index" command. Is also used in
// searches to show a desired selection of politicians.
     indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.politicians);
        } else {
                 res.render("politicians/index", {
            flashMessages: {
                loaded: "Nämä kansanedustajat löytyivät."
            }
        });
        }

    },
// Render politicians/new.ejs
    new: (req, res) => {
        res.render("politicians/new");
    },
// Create and add a new politician into the database
    create: (req, res, next) => {
        let politicianParams = getPoliticianParams(req.body);
        Politician.create(politicianParams)
        .then(politician => {
            req.flash("success", `${politician.fullName}'s data created succesfully`);
            res.locals.redirect = "/politicians/new";
            res.locals.politician = politician;
            next();
        })
        .catch(error => {
            console.log(`CREATE error saving politician: ${error.message}`);
            res.locals.redirect = "/politicians/new";
            req.flash("error", `Failed to create politician: ${error.message}`);
            next();
        });
    },

// Read redirectpath and render into view
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

// Show a single politician's data
    show: (req, res, next) => {
        var politicianId = req.params.id;
        Politician.findById(politicianId)
        .then(politician => {
            res.locals.politician = politician;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching politician by Id: ${error.message}`);
            next(error);
        });
    },

// Render politicians/show.ejs into view
    showView: (req, res) => {
        res.render("politicians/show");
    },

// Render politicians/edit.ejs into view, before that fetch th politicians's data
// from database so that the user can view the data before editing
    edit: (req, res, next) => {
        var politicianId = req.params.id;
        Politician.findById(politicianId)
        .then(politician => {
            res.render("politicians/edit", {
                politician: politician
            });
        })
        .catch(error => {
            console.log(`EDIT error fetching politician by id: ${error.message}`);
            next(error);
        });
    },

// Render politicians/pick.ejs into view, used to pick a politician
// into a player's team
    pick: (req, res, next) => {
        var politicianId = req.params.id;
        Politician.findById(politicianId)
        .then(politician => {
            res.render("politicians/pick", {
                politician: politician
            });
        })
        .catch(error => {
            console.log(`EDIT error fetching politician by id: ${error.message}`);
            next(error);
        });
    },

// Write the edited politician's data into the database
    update: (req, res, next) => {
        let politicianId = req.params.id;
        let politicianParams = getPoliticianParams(req.body);

            Politician.findByIdAndUpdate(politicianId, {
                $set: politicianParams,
            })
            .then(politician => {
                res.locals.redirect = `/politicians/${politicianId}`;
                res.locals.politician = politician;
                next();
            })
            .catch(error => {
                console.log(`UPDATE error updating politician by id: ${error.message}`);
                next(error);
            });
    },

// Set a politician into a player's team
    choose: (req, res, next) => {
        let politicianId = req.params.id,
            politicianParams = getPoliticianParams(req.body);

            Politician.findByIdAndUpdate(politicianId, {
                $set: politicianParams
            })
            .then(politician => {
                res.locals.redirect = `/politicians/${politicianId}`;
                res.locals.politician = politician;
                next();
            })
            .catch(error => {
                console.log(`CHOOSE error updating politician by id: ${error.message}`);
                next(error);
            });
    },

// Remove a politician permanently from the database
    delete: (req, res, next) => {
        let politicianId = req.params.id;
        Politician.findByIdAndDelete(politicianId)
        .then(() => {
            res.locals.redirect = "/politicians";
            next();
        })
        .catch(error => {
            console.log(`DELETE error deleting politician by id: ${error.message}`);
            next(error);
        });
    },

// Fetch all desired party members from the database. Indexview is used to show these onscreen
     showParty: (req, res, next) => {
        var partyId = req.params.party;
        Politician.find({party: partyId})
        .then(politicians => {
            res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching party: ${error.message}`);
            next(error);
        });
    },
// Fetch all politician by status (rookie, veteran, regular)
    showStatus: (req, res, next) => {
        var statusId = req.params.status;
        Politician.find({status: statusId})
        .then(politicians => {
            res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching status: ${error.message}`);
            next();
        })
    },

// Fetch all politicians by government/opposition status
    showPower: (req, res, next) => {
        var powerId = req.params.power;
        Politician.find({power: powerId})
        .then(politicians => {
            res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching power: ${error.message}`);
            next();
        })
    },
// NOT USED???? TEST THIS
    searchLastName: (req,res) => {
        res.render("politicians/searchLastName");
    },

// Fetch politicians by name from database
    showSearchLastName: (req, res, next) => {
    var politicianName = req.body.lastName;
    Politician.find({'name.last': politicianName})
        .then(politicians => {
                res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching politician: ${error.message}`);
            next(error);
        });
    },
// Show politicians by user(player) nickname
    showSearchPlayer: (req, res, next) => {
    var playerName = req.body.player;
    Politician.find({player: playerName})
        .then(politicians => {
                res.locals.politicians = politicians;
            next();
        })
        .catch(error => {
            console.log(`SHOW error fetching politician: ${error.message}`);
            next(error);
        });
    },

    respondJSON: (req, res) => {
        console.log("respondJSON");
        res.json({
            status: httpStatus.StatusCodes.OK,
            data: res.locals
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Unknown error"
            };
        }
        res.json(errorObject);
    },

////////////////////////////////////////////////////
    joinTeam: (req, res, next) => {

        let politicianId = req.params.id;
        let currentUser = req.user;
          console.log(politicianId);
          console.log(currentUser);

        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    politicians: politicianId
                }
            })
            .then(() => {
                res.locals.success = true;
                next();
            })
            .catch(error => {
                console.log("POLITICIAN TEAM JOIN ERROR");
                next(error);
            });
        } else {
            console.log("Must log in");
            next(new Error("User must log in"));
        }
    },


    // First assign true or false to all politicians depending
    // if they are in logged users team
    // then return only the politicians with true flag
    // Seems wasteful to do it runtime at every call, probably could transfer to
    // a database-based approach with db.find where politician.user == currentUser?
    // This works, though and updates live.

    filterUserPoliticians: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        let returnPoliticians = [];

        if (currentUser) {
            console.log("filtteröidään");
            let mappedPoliticians = res.locals.politicians.map((politician) => {

                let userJoined = currentUser.politicians.some((userPolitician) => {
                    //console.log("filtteröidään2");
                    return userPolitician.equals(politician._id);


                });

                return Object.assign(politician.toObject(), {joined: userJoined});
            });

            for (let i = 0; i < mappedPoliticians.length; i++) {
            if (mappedPoliticians[i].joined) {
                returnPoliticians.push(mappedPoliticians[i]);
            }
           }
            res.locals.politicians = returnPoliticians;

            console.log(mappedPoliticians.length);
            console.log(returnPoliticians.length);

            next();
        } else {
                console.log("ei filtteröinti onnistu");
            next();
        }
    }


};
