const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/product");

dotenv.config();

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });

//Function to seed data
const seedData = async () => {
  try {
    console.log("Starting Data Seeding...");

    //clear excisting data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //Assign the default userId to each product
    const userId = createdUser._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: userId };
    });

    //insert the products into the database
    await Product.insertMany(sampleProduct);
    console.log("Product data seeded successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
