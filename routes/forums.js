var express = require('express');
var router = express.Router();
const ForumModel = require("./../models/Forum");

// POST
router.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const newForum = await ForumModel.create(req.body);
        res.json(newForum)
    } catch (err) {
        next(err)
    }
})

// GET
router.get("/", async (req, res, next) => {
    try {
        const forums = await ForumModel.find()
        .populate("id_subjects")
        res.json(forums);
    } catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
        const forum = await ForumModel.findById(req.params.id)
        .populate("id_subjects")
        res.json(forum);
    } catch (err) {
        next(err);
    }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteForum = await ForumModel.findByIdAndDelete(req.params.id);
        res.json(deleteForum);
    } catch (err) {
        next(err)
    }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
    try {
        const updateForum = await ForumModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updateForum);
    } catch (err) {
        next(err)
    }
})

module.exports = router;