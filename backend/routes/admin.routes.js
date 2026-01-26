const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getUserStats } = require('../controller/admin.controller');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/admin.middleware');

// Get all users (admin only)
router.get('/users', auth, isAdmin, getAllUsers);

// Delete user (admin only)
router.delete('/users/:id', auth, isAdmin, deleteUser);

// Get dashboard stats (admin only)
router.get('/stats', auth, isAdmin, getUserStats);

module.exports = router;