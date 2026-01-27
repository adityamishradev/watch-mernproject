const Wishlist = require("../models/wishlist.model");

async function addToWishlist(req, res) {
  try {
    console.log("=== ADD TO WISHLIST ===");
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.id);
    
    const { productId, title, price, imgSrc, category, description } = req.body;
    const userId = req.user.id;

    if (!productId || !title || !price) {
      console.log("Invalid data:", { productId, title, price });
      return res.status(400).json({ message: "Missing required fields: productId, title, price" });
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

    let wishlist = await Wishlist.findOne({ userId });
    console.log("Existing wishlist:", wishlist ? `Found with ${wishlist.items.length} items` : "Not found");

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
      console.log("Created new wishlist for user");
    }

    // Check if item already exists in wishlist
    const itemExists = wishlist.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemExists) {
      console.log("Item already exists in wishlist");
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    // Add new item to wishlist
    const newItem = {
      productId,
      title,
      price: Number(price),
      imgSrc: processedImgSrc, // Use processed string
      category: category || '',
      description: description || '',
    };
    
    wishlist.items.push(newItem);
    console.log("Adding new item:", newItem);

    await wishlist.save();
    console.log("Wishlist saved successfully. Total items:", wishlist.items.length);
    
    res.status(200).json({ 
      message: "Item added to wishlist", 
      wishlist: {
        userId: wishlist.userId,
        items: wishlist.items,
        totalItems: wishlist.items.length
      }
    });

  } catch (error) {
    console.error("Error in addToWishlist:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}

async function getUserWishlist(req, res) {
  try {
    console.log("=== GET USER WISHLIST ===");
    console.log("User ID:", req.user.id);
    
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId });

    // If user has no wishlist yet, return an empty items array
    if (!wishlist) {
      console.log("No wishlist found, returning empty");
      return res.json({ userId, items: [], totalItems: 0 });
    }

    console.log(`Wishlist found with ${wishlist.items.length} items`);
    res.json({
      userId: wishlist.userId,
      items: wishlist.items,
      totalItems: wishlist.items.length
    });
  } catch (error) {
    console.error("Error in getUserWishlist:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}

async function removeFromWishlist(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ userId });

    // If no wishlist exists, return an empty wishlist
    if (!wishlist) {
      return res.json({ message: "Wishlist is empty", wishlist: { userId, items: [] } });
    }

    wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId);

    await wishlist.save();
    res.json({ message: "Product removed from wishlist", wishlist });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function clearWishlist(req, res) {
  try {
    const userId = req.user.id;

    await Wishlist.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true, upsert: true }
    );

    res.json({ message: "Wishlist cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  clearWishlist,
};