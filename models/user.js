// mongoose schema for the "User" model, including all the associated virtual attributes
const mongoose = require("mongoose"),
{Schema} = mongoose;
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

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
        // password: {
        //     type: String,
        //     required: true
        // },
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

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

userSchema.virtual("fullName")
.get(function() {
    return `${this.name.last} ${this.name.first}`
});

// userSchema.pre("save", function(next) {
//     let user = this;
//     bcrypt.hash(user.password, 10)
//     .then(hash => {
//         user.password = hash;
//         next();
//     })
//     .catch(error => {
//         console.log(`Hashing error: ${error.message}`);
//         next(error);
//     });
// });

// userSchema.methods.passwordComparison = function(inputPassword) {
//     let user  = this;
//     return bcrypt.compare(inputPassword, user.password);
// };

module.exports = mongoose.model("User", userSchema);