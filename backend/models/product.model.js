const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true, // ❌ require → ✅ required (mongoose fix)
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
  },

  /* ================= IMAGE (CLOUDINARY) ================= */

  // ❌ OLD
  // imgSrc: { type: String, require: true }

  // ✅ NEW (Cloudinary Object)
  imgSrc: {
    public_id: {
      type: String,
      required: true, // Cloudinary public id (delete/update ke liye)
    },
    url: {
      type: String,
      required: true, // Cloudinary image URL (frontend display)
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
