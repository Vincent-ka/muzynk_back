const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postFeedSchema = new Schema({
    content: String,
    date_published: Date,
    id_tags: [{
        type : Schema.Types.ObjectId,
        ref: "Tag"
    }]
});

const postFeedModel = mongoose.model("PostFeed", postFeedSchema);
module.exports = postFeedModel;