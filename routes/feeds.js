var express = require('express');
var router = express.Router();
const FeedModel = require("./../models/Feed")

// POST
router.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const newFeed = await FeedModel.create(req.body);
      res.json(newFeed)
    } catch (err) {
      next(err)
    }
  })

  // GET
router.get("/", async (req, res, next) => {
    try {
      const feeds = await FeedModel.find()
      .populate("id_author")
      .populate("id_postsFeed");
      res.json(feeds);
    } catch (err) {
      next(err);
    }
  });

  // GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
      const feed = await FeedModel.findById(req.params.id)
      .populate("id_author")
      .populate("id_postsFeed");
      res.json(feed);
    } catch (err) {
      next(err);
    }
  });

  // DELETE
router.delete("/:id", async (req, res, next) => {
    try {
      const deleteFeed = await FeedModel.findByIdAndDelete(req.params.id);
      res.json(deleteFeed);
    } catch (err) {
      next(err)
    }
  })

  // PATCH
router.patch("/:id", async (req, res, next) => {
    try {
      const updateFeed = await FeedModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.json(updateFeed);
    } catch (err) {
      next(err)
    }
  })

module.exports = router;