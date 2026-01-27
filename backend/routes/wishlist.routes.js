const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controller/wishlist.controller");

const auth = require("../middleware/auth.middleware");

// Test route to verify wishlist integration
router.get("/test", auth, (req, res) => {
  res.json({ 
    message: "Wishlist API is working!", 
    userId: req.user.id,
    timestamp: new Date().toISOString()
  });
});

router.post("/add", auth, addToWishlist);
router.get("/", auth, getUserWishlist);
router.delete("/remove/:productId", auth, removeFromWishlist);
router.delete("/clear", auth, clearWishlist);

module.exports = router;