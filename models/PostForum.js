const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postForumSchema = new Schema({
    id_author: {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    firstname: String,
    avatar: String,
    date_published: Date,
    date_modified: Date
});

const postForumModel = mongoose.model("PostForum", postForumSchema);
module.exports = postForumModel;