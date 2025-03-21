const express = require("express");
const User = require("../models/User");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route get /api/admin/users
//@desc get all users (admin only)
//@acces private/admin
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users, message: "Error" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route post /api/admin/users
//@desc add a new users (admin only)
//@acces private

router.post("/users", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) res.status(400).json({ message: "User already exist" });

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    res.status(200).json({ message: "New User Added", user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route Put /api/admin/users/:id
//@desc update the users (admin only) - name email role
//@acces private/admin

router.put("/users/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated Successfully", updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route delete /api/admin/users/delete/:id
//@desc delete the users (admin only)
//@acces private/admin

router.delete("/delete/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ message: "User Removed Successfully", deletedUser: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
