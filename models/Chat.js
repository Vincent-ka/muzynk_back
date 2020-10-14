const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    message: [
        {
        content: String,
        id_sender: {
            type : Schema.Types.ObjectId,
            ref: "User"
        },
        id_receiver: {
            type : Schema.Types.ObjectId,
            ref: "User"
        },
        date: Date
    }
]

});

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;