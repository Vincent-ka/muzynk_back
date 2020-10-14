var express = require('express');
var router = express.Router();
const SubjectModel = require("./../models/Subject")

// POST
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newSubject = await SubjectModel.create(req.body);
    res.json(newSubject)
  } catch (err) {
    next(err)
  }
})

// GET
router.get("/", async (req, res, next) => {
  try {
    const subjects = await SubjectModel.find()
    .populate("id_creator")
    .populate("id_postsForum")
    .populate("id_tags");
    res.json(subjects);
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const subject = await SubjectModel.findById(req.params.id)
    .populate("id_creator")
    .populate("id_postsForum")
    .populate("id_tags");
    res.json(subject);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteSubject = await SubjectModel.findByIdAndDelete(req.params.id);
    res.json(deleteSubject);
  } catch (err) {
    next(err)
  }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
  try {
    const updateSubject = await SubjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updateSubject);
  } catch (err) {
    next(err)
  }
})

module.exports = router;