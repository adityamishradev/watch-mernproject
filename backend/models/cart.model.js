const mongoose = require("mongoose");

/* ================= CART ITEM SCHEMA ================= */
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    imgSrc: {
      type: String,
      required: true,
    },
  },
  { _id: false } // 👈 optional (cart items ke liye clean)
);

/* ================= CART SCHEMA ================= */
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 👈 ek user ka ek hi cart
    },
    items: [cartItemSchema],

    totalQty: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
