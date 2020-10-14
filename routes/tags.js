var express = require('express');
var router = express.Router();
const TagModel = require("./../models/Tag")

// POST
router.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const newTag = await TagModel.create(req.body);
      res.json(newTag)
    } catch (err) {
      next(err)
    }
  })

  // GET
router.get("/", async (req, res, next) => {
    try {
      const tags = await TagModel.find();
      res.json(tags);
    } catch (err) {
      next(err);
    }
  });

  // GET BY ID
router.get("/:id", async (req, res, next) => {
    try {
      const tag = await TagModel.findById(req.params.id);
      res.json(tag);
    } catch (err) {
      next(err);
    }
  });

  // DELETE
router.delete("/:id", async (req, res, next) => {
    try {
      const deleteTag = await TagModel.findByIdAndDelete(req.params.id);
      res.json(deleteTag);
    } catch (err) {
      next(err)
    }
  })

  // PATCH
router.patch("/:id", async (req, res, next) => {
    try {
      const updateTag = await TagModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      res.json(updateTag);
    } catch (err) {
      next(err)
    }
  })

module.exports = router;