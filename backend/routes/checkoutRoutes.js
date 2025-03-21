const express = require("express");

const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route Post /api/checkout
//@desc create a new checkout session
//@access private

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkout" });
  }
  try {
    //create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(` Checkout created for user ${req.user._id}`);
    res.status(200).json(newCheckout);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
});

//route put /api/checkout/:id/pay
//desc update checkout to mark as paid after successfull payment
//@acces private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }
    if (paymentStatus === "paid") {
      (checkout.isPaid = true),
        (checkout.paymentStatus = paymentStatus),
        (checkout.paymentDetails = paymentDetails);
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json({ message: "Payement Successfull", checkout });
    } else {
      res.status(404).json({ message: "Invalid Payment Status" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
});

//route Post /api/checkout/:id/finalize
//desc finalize checkout and convert to order after payment confirmation
//@access private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      //create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      //mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "checkout already finalized" });
    } else {
      res.status(400).json({ message: "checkout is not paid" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
