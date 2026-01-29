// 🔹 Product Model
const productModel = require("../models/product.model.js");

// 🔹 Cloudinary config import (NEW)
const cloudinary = require("../../.vscode/config/cloudinary.js");

/* ================= ADD PRODUCT ================= */
async function Addproduct(req, res) {
  // ✅ img Cloudinary se aayegi
  const { title, description, price, category, qty } = req.body;

  try {

    // ✅ check image uploaded or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // ✅ Cloudinary image details (NEW)
    const imgSrc = {
      public_id: req.file.filename || req.file.public_id, // cloudinary public id
      url: req.file.path || req.file.secure_url,           // cloudinary image url
    };

    // ✅ product create
    const product = await productModel.create({
      title,
      description,
      price,
      category,
      qty,

      // 🔹 imgSrc ab cloudinary object hoga
      imgSrc,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/* ================= GET ALL PRODUCTS ================= */
async function getAllproduct(req, res) {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Get products successfully",
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

/* ================= SEARCH PRODUCTS ================= */
async function searchProducts(req, res) {
  try {
    const { q } = req.query;

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

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/* ================= UPDATE PRODUCT ================= */
async function productUpdate(req, res) {
  const id = req.params.id;

  try {
    let updateData = req.body;

    // ✅ agar new image upload hui ho
    if (req.file) {
      const product = await productModel.findById(id);

      // 🔥 OLD IMAGE DELETE FROM CLOUDINARY (NEW)
      if (product?.imgSrc?.public_id) {
        await cloudinary.uploader.destroy(product.imgSrc.public_id);
      }

      // 🔹 NEW IMAGE SET
      updateData.imgSrc = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({ success: true, product: updatedProduct });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

/* ================= DELETE PRODUCT ================= */
async function productdelete(req, res) {
  const id = req.params.id;

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔥 IMAGE DELETE FROM CLOUDINARY (NEW)
    if (product.imgSrc?.public_id) {
      await cloudinary.uploader.destroy(product.imgSrc.public_id);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

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
