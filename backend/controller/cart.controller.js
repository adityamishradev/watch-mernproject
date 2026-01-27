const Cart = require("../models/cart.model");


async function addToCart(req, res) {
  try {
    console.log("=== ADD TO CART ===");
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.id);
    
    const { productId, title, price, qty, imgSrc } = req.body;
    const userId = req.user.id;

    if (!productId || !price || !qty) {
      console.log("Invalid data:", { productId, price, qty });
      return res.status(400).json({ message: "Invalid data" });
    }

    // Backend validation: Ensure imgSrc is a string
    let processedImgSrc = '';
    if (typeof imgSrc === 'string') {
      processedImgSrc = imgSrc;
    } else if (imgSrc && typeof imgSrc === 'object' && imgSrc.url) {
      processedImgSrc = imgSrc.url; // Extract URL from object
    } else if (imgSrc && typeof imgSrc === 'object') {
      // Handle other object formats
      processedImgSrc = imgSrc.secure_url || imgSrc.public_id || '';
    }
    
    console.log("Processed imgSrc:", processedImgSrc);

    let cart = await Cart.findOne({ userId });
    console.log("Existing cart:", cart ? `Found with ${cart.items.length} items` : "Not found");

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      console.log("Created new cart");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      console.log("Updated existing item quantity");
    } else {
      cart.items.push({
        productId,
        title,
        price,      // unit price
        qty,
        imgSrc: processedImgSrc, // Use processed string
      });
      console.log("Added new item to cart");
    }

    await cart.save();
    console.log("Cart saved successfully");
    res.status(200).json({ message: "Item added to cart", cart });

  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: error.message });
  }
}


async function getUserCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    // If user has no cart yet, return an empty items array (frontend expects this)
    if (!cart) {
      return res.json({ userId, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function removeCartProduct(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    // If no cart exists, return an empty cart (don't treat as error)
    if (!cart) {
      return res.json({ message: "Cart is empty", cart: { userId, items: [] } });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.json({ message: "Product removed", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function clearCart(req, res) {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true, upsert: true }
    );

    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function decreaseCartQty(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ message: "Cart is empty", cart: { userId, items: [] } });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (item.qty > 1) {
      item.qty -= 1;
    } else {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    }

    await cart.save();
    res.json({ message: "Quantity updated", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addToCart,
  getUserCart,
  removeCartProduct,
  clearCart,
  decreaseCartQty,
};
