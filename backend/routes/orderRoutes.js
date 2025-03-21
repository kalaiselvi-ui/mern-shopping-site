const express = require("express");

const Order = require("../models/Order");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route Get /api/orders/my-orders
//desc get users orders for loggedin user
//@access private
router.get("/my-orders", protect, async (req, res) => {
  try {
    //find orders for the authenticated users
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); //sort by most recent orders
    res.json({ message: "order fetched successfully", orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
});

//@route Get /api/orders/:id
//desc get users orders details by id
//@access private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    //Return the full order details
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
