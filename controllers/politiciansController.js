const politician = require("../models/politician");

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

module.exports = {
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

    indexView: (req, res) => {
        res.render("politicians/index", {
            flashMessages: {
                loaded: "Nämä kansanedustajat löytyivät."
            }
        });
    },

    new: (req, res) => {
        res.render("politicians/new");
    },

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

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },

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

    showView: (req, res) => {
        res.render("politicians/show");
    },

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

    searchLastName: (req,res) => {
        res.render("politicians/searchLastName");
    },

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

