const express = require("express");

const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route get /api/admin/orders
//@desc get all orders (admin only)
//@acces private/admins

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    if (!orders) {
      res.status(400).send("internal error");
    }
    res.status(200).json({ message: "Orders found", orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route Put /api/admin/:id
//@desc update orders status
//@acces private/admins

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//@route delete /api/admin/delete/:id
//@desc delete an orders
//@acces private/admins

router.delete("/delete/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Deleted Order", order });
    } else {
      res.status(400).json({ message: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
