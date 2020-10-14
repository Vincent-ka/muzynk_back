const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    id_author: {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    id_postsFeed: [{
        type : Schema.Types.ObjectId,
        ref: "PostFeed"
    }]
});

const feedModel = mongoose.model("Feed", feedSchema);
module.exports = feedModel;