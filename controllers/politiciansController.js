// Handle different actions and views when fetchin information
// from the Mongodb database

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
        res.render("politicians/index", {
            flashMessages: {
                loaded: "Nämä kansanedustajat löytyivät."
            }
        });
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
    }
};
