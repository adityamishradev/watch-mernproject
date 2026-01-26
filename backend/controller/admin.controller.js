const User = require('../models/user.model');
const Product = require('../models/product.model');

/* ================= GET ALL USERS ================= */
async function getAllUsers(req, res) {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}

/* ================= DELETE USER ================= */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin user'
      });
    }

    await User.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}

/* ================= GET DASHBOARD STATS ================= */
async function getUserStats(req, res) {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  getUserStats
};