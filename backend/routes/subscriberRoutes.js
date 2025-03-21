const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route post /api/subscribe
//@desc handle newsletter subscribtion
//@access public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    //check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email is already Subscribed" });
    }
    //create a new subscribe
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(200).json({ massage: "Successfully subscribed", subscriber });
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: "Internal Error" });
  }
});

module.exports = router;
