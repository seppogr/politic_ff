const mongoose = require("mongoose"),
{Schema} = mongoose;

const userSchema = new Schema (
    {

         name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            },
            nick: {
                type: String,
                trim: true
            }
        },
        // team: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Politician"
        //     }
        // ],
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName")
.get(function() {
    return `${this.name.last} ${this.name.first}`
});


module.exports = mongoose.model("User", userSchema);