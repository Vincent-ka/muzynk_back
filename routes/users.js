var express = require('express');
var router = express.Router();
const UserModel = require("./../models/User");
const auth = require("./../auth/index");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");

// POST
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await UserModel.create(req.body);
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// GET
router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find().sort({_id: -1})
    .populate("friendlist");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
    .populate("User");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    res.json(deleteUser);
  } catch (err) {
    next(err)
  }
})

// PATCH
router.patch("/:id", async (req, res, next) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updateUser);
  } catch (err) {
    next(err)
  }
})

// PATCH PASSWORD
router.patch("/password/:id", auth.authenticate, async (req, res, next) => {
  var user = {
    ...req.body
  };
  try {
    // var password = req.body.password;
    const newPassword = await bcrypt.hash(user.password, 10);
    user.password = newPassword;
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, user, {
      new: true
    }); //pour récuperer le doc mis à jour
    res.json(updateUser);
  } catch (err) {
    console.log(err)
    next(err)
  }

});

// PATCH AVATAR
router.patch(
  "/:id/avatar",
  uploader.single("avatar"),
  async (req, res, next) => {
    if (!req.file)
      return res
        .status(401)
        .json({ msg: "Avatar file object is needed here !!!" });

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { avatar: req.file.path },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
);


module.exports = router;