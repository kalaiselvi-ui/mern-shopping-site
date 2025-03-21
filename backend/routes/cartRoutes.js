const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart
const getCart = async (userId, guestId) => {
  const cart = await Cart.findOne({
    $or: [{ user: userId }, { guestId: guestId }],
  });

  return cart || null; // Ensure null is returned instead of an empty object
};

// Route to add a product to the cart
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await getCart(userId, guestId);
    console.log("Cart from DB before updating:", JSON.stringify(cart, null, 2));

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;

        if (cart.products[productIndex].quantity <= 0) {
          cart.products.splice(productIndex, 1); // Remove product if quantity is zero
        }
      } else if (quantity > 0) {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      console.log("Cart Before Saving:", JSON.stringify(cart, null, 2));

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      console.log("Cart After Saving:", JSON.stringify(cart, null, 2));

      res.status(200).json({ message: "Cart Items", cart });
    } else {
      //create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      console.log("New Cart Created:", JSON.stringify(newCart, null, 2));

      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

//@route put /api/cart/update
//update product quantity incre/decre in the cart

router.put("/update", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });
    // console.log("Cart Found:", cart);
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      //update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      if (cart.products.length === 0) {
        await Cart.findByIdAndDelete(cart._id); // Delete cart if empty
        console.log("🗑️ Cart deleted because it was empty.");
        return res.status(200).json({ message: "Cart deleted" });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      res.status(200).json({ message: "Cart Items", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

//@route put /api/cart/delete
//delete product in the cart

router.delete("/delete", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1); // Remove only that product
      if (cart.products.length === 0) {
        await Cart.findByIdAndDelete(cart._id); // Delete cart if empty
        console.log("🗑️ Cart deleted because it was empty.");
        return res.status(200).json({ message: "Cart deleted" });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save(); // Save the updated cart
      return res.status(200).json({ message: "Product removed", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

//@route get /api/cart/all
//get the all products in the cart

router.get("/all", async (req, res) => {
  const { userId, guestId } = req.body;
  try {
    const cart = await getCart(userId, guestId);

    if (cart) {
      res.status(200).json({ message: "Cart Items", cart });
    } else {
      res.status(404).send("No Cart Items found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

//@route post /api/cart/merge
//@desc merge guest cart into usercart on login
//access private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            // If the item exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the user cart
            userCart.products.push(guestItem);
          }
        });

        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        await userCart.save();
        // Remove the guest cart after merging
        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json(userCart); // ✅ Return the correct cart
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      // Guest cart has already been merged, return user cart
      return res.status(200).json(userCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal error");
  }
});

module.exports = router;
