const express = require("express");
const router = express.Router();

const {
  addToCart,
  getUserCart,
  removeCartProduct,
  clearCart,
  decreaseCartQty,
} = require("../controller/cart.controller");

const auth = require("../middleware/auth.middleware");


router.post("/add", auth, addToCart);


// support both `/api/cart` and `/api/cart/getcart`
router.get("/", auth, getUserCart);
router.get("/getcart", auth, getUserCart);


router.patch("/decrease", auth, decreaseCartQty);

router.delete("/remove/:productId", auth, removeCartProduct);

router.delete("/clear", auth, clearCart);

module.exports = router;
