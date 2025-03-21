const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@create post Api for product
//@access private/admin
router.post("/create", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
      user: req.user._id, //Reference to the admin user who created it
    });

    const createdProduct = await product.save();

    res.status(201).json({ message: "Product Created", createdProduct });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Fail to Create Product" });
  }
});

//@route put api for /api/products/:id
//@access private/admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
    } = req.body;

    //find the product by id
    const product = await Product.findById(req.params.id);

    if (product) {
      //update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimentions = dimentions || product.dimentions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();

      res
        .status(201)
        .json({ message: "updated product successfully", updatedProduct });
    } else {
      res.status(404).json({ message: "Products Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Error" });
  }
});

//@route for delete /api/products/:id
//@access private/admin
router.delete("/delete/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Products Not Found" });
    }
    res.json({ message: "Product Removed", deletedProduct: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Error" });
  }
});

//@ Api get api/get product
//get all products with optional query filters

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      material,
      brand,
      sortBy,
      gender,
      minPrice,
      maxPrice,
      search,
      category,
      limit,
    } = req.query;
    let query = {};

    //Filter Logic

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collection = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.color = { $in: color.split(",") };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    //sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

//@get /api/products/best-seller
//@desc retrieves the products with highest rating
//access public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSellers = await Product.find().sort({ rating: -1 }).limit(5);

    if (bestSellers.length > 0) {
      res.status(200).json({ message: "Best Seller Products", bestSellers });
    } else {
      res.status(404).json({ message: "Best seller products not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//@get /api/products/new-arrivals
//@desc retrieves the lastest product - creation date
//access public

router.get("/new-arrivals", async (req, res) => {
  try {
    //fetch latest 8 products from db
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (newArrivals.length === 0) {
      return res.status(404).json({ message: "New Arrivals Not Found" });
    }
    res.status(201).json({ message: "success", newArrivals });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//@get Api/products/:id
//get a single product
//@access public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    }
    res.status(404).json({ message: "Product Not Found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route get /api/products/similar/:id
//@ retrive similar products based on current product gender & category
//@access public

router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, //exclude the current product id
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res
      .status(201)
      .json({ message: "similar products fetched", similarProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
