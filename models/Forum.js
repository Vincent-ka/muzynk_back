const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    title: String,
    id_subjects: [{
        type : Schema.Types.ObjectId,
        ref: "Subject"
    }]
});

const forumModel = mongoose.model("Forum", forumSchema);
module.exports = forumModel;