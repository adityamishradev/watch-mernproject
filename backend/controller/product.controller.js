const productModel = require("../models/product.model.js");

/* ================= ADD PRODUCT ================= */
async function Addproduct(req, res) {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    const product = await productModel.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });

    res.status(201).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/* ================= GET ALL PRODUCTS ================= */
async function getAllproduct(req, res) {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "get product successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/* ================= GET PRODUCT BY ID ================= */
async function getProductById(req, res) {
  const id = req.params.id;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/* ================= SEARCH PRODUCTS (REGEX) ================= */
async function searchProducts(req, res) {
  try {
    const { q } = req.query; // ?q=watch

    if (!q) {
      return res.json({ success: true, products: [] });
    }

    const products = await productModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/* ================= UPDATE PRODUCT ================= */
async function productUpdate(req, res) {
  const id = req.params.id;

  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/* ================= DELETE PRODUCT ================= */
async function productdelete(req, res) {
  const id = req.params.id;

  try {
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  Addproduct,
 getAllproduct,
  getProductById,
  searchProducts,
  productUpdate,
  productdelete,
};
