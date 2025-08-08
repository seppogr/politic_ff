// mongoose schema for the "User" model, including all the associated virtual attributes
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
        team: [
            {
                type: Schema.Types.ObjectId,
                ref: "Politician"
            }
        ],
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
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