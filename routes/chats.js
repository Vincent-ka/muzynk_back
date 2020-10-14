var express = require('express');
var router = express.Router();
const ChatModel = require("./../models/Chat")

// POST
router.post("/", async (req, res, next) => {
    const { id_receiver, id_sender, content } = req.body;
    try {
        console.log(req.body);
        const newChat = await ChatModel.create({
            id_receiver,
            id_sender,
            content,
            date: Date.now(),
        });
        res.json(newChat)
    } catch (err) {
        next(err)
    }
})

// GET
router.get("/", async (req, res, next) => {
    try {
        const chats = await ChatModel.find()
        .populate({path:"message", populate:[{path:"id_sender"}]})
        .populate({path:"message", populate:[{path:"id_receiver"}]});
        res.json(chats);
    } catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
        const chat = await ChatModel.findById(req.params.id)
        .populate({path:"message", populate:[{path:"id_sender"}]})
        .populate({path:"message", populate:[{path:"id_receiver"}]});
        res.json(chat);
    } catch (err) {
        next(err);
    }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteChat = await ChatModel.findByIdAndDelete(req.params.id);
        res.json(deleteChat);
    } catch (err) {
        next(err)
    }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
    try {
        const updateChat = await ChatModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updateChat);
    } catch (err) {
        next(err)
    }
})

module.exports = router;