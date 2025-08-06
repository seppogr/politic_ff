
const mongoose = require("mongoose"),
{Schema} = mongoose;

const politicianSchema = new Schema (
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        party: {
            type: Array
        },
        power: {
            type: Array
        },
        status: {
            type: Array

        },

        player: {
            type: String
        },

        points: {
            won: {
                type: Number,
                default: 0
            },
            lost: {
                type: Number,
                default: 0
            }
        },

        draft: {
            round: {
                type: Number
            },
            pickInRound: {
                type: Number
            },
            totalPick: {
                type: Number
            }
        }

    },
    {
        timestamps: true
    }
);

politicianSchema.virtual("fullName")
.get(function() {
    return `${this.name.last} ${this.name.first}`
});

politicianSchema.virtual("lastName")
.get(function() {

    return `${this.name.last}`
});

politicianSchema.virtual("nameFull")
.get(function() {
    return `${this.name.first} ${this.name.last}`
});

politicianSchema.virtual("totalPoints")
.get(function(){
    return `${this.points.won}` - `${this.points.lost}`;
});

politicianSchema.virtual("currentTotal")
.get(function(){
    return parseInt(`${this.points.won}`);
});



module.exports = mongoose.model("Politician", politicianSchema);