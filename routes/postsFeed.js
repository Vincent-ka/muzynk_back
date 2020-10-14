var express = require('express');
var router = express.Router();
const PostFeedModel = require("./../models/PostFeed")

// POST
router.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const newPostFeed = await PostFeedModel.create(req.body);
      res.json(newPostFeed)
    } catch (err) {
      next(err)
    }
  })

  // GET
router.get("/", async (req, res, next) => {
    try {
      const postsFeed = await PostFeedModel.find()
      .populate("id_tags");
      res.json(postsFeed);
    } catch (err) {
      next(err);
    }
  });

  // GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
      const postFeed = await PostFeedModel.findById(req.params.id)
      .populate("id_tags");
      res.json(postFeed);
    } catch (err) {
      next(err);
    }
  });

  // DELETE
router.delete("/:id", async (req, res, next) => {
    try {
      const deletePostFeed = await PostFeedModel.findByIdAndDelete(req.params.id);
      res.json(deletePostFeed);
    } catch (err) {
      next(err)
    }
  })

  // PATCH
router.patch("/:id", async (req, res, next) => {
    try {
      const updatePostFeed = await PostFeedModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.json(updatePostFeed);
    } catch (err) {
      next(err)
    }
  })

module.exports = router;