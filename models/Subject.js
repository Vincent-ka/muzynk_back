const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    title: String,
    id_creator: {
        type : Schema.Types.ObjectId,
        ref: "User"
    },
    firstname: String,
    id_postsForum: [{
        type : Schema.Types.ObjectId,
        ref: "PostForum"
    }],
    id_tags: [{
        type : Schema.Types.ObjectId,
        ref: "Tag"
    }]
});

const subjectModel = mongoose.model("Subject", subjectSchema);
module.exports = subjectModel;