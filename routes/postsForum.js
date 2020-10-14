var express = require('express');
var router = express.Router();
const PostForumModel = require("./../models/PostForum")

router.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const newPostForum = await PostForumModel.create(req.body);
        res.json(newPostForum)
    } catch (err) {
        next(err)
    }
})

// GET
router.get("/", async (req, res, next) => {
    try {
        const postsForum = await PostForumModel.find()
        .populate("id_author");
        res.json(postsForum);
    } catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
        const postForum = await PostForumModel.findById(req.params.id)
        .populate("id_author");
        res.json(postForum);
    } catch (err) {
        next(err);
    }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const deletePostForum = await PostForumModel.findByIdAndDelete(req.params.id);
        res.json(deletePostForum);
    } catch (err) {
        next(err)
    }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
    try {
        const updatePostForum = await PostForumModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatePostForum);
    } catch (err) {
        next(err)
    }
})

module.exports = router;