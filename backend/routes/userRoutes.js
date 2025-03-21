const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//route for /api/users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // res.json({ name, email, password, message: "successfully registered" });
    let excistingUser = await User.findOne({ email });

    if (excistingUser)
      return res.status(400).json({ message: "User already exist" });

    const newUser = new User({
      name,
      email,
      password,
    });
    const user = await newUser.save();

    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;

      res.status(201).json({
        message: "User Successfuly registered",
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//route for /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credential" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch) return res.status(400).json({ message: "Password Mismatch" });

    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;

      res.status(201).json({
        message: "User Successfuly Signed",
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//route for /api/users/profile
//get login-user's profile(protected route)
//@access private
router.get("/profile", protect, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
