const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dads6b5bs/image/upload/v1600164451/user-pictures/user1-reduite_sdw6gm.jpg",
    },
    password: String,
    friendlist: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    fil: [{
        type: Schema.Types.ObjectId,
        ref: "Feed"
    }],
    role: {
        type: String,
        enum: ["admin", "user", "moderator"],
        default: "user"
    },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;