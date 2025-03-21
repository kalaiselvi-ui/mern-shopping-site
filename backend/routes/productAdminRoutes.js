const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route get /api/admin/products
//@desc get all products (admin only)
//@acces private/admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(400).send("internal error");
    }
    res.json({ products, message: "product found" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
