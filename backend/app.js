const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
require('dotenv').config()
const db = require('./config/db');
db();
const authRoutes = require('./routes/Auth.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/Products.routes'); 
const cartRoutes = require('./routes/cart.routes');
const wishlistRoutes = require('./routes/wishlist.routes');

const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(
  cors({
    origin: ["https://watch-mernproject01.vercel.app", "https://watch-mernproject.onrender.com", "http://localhost:5173"], // frontend URLs
    credentials: true,               // cookies / jwt ke liye MUST
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Backend Running ...!!!')
})

app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Test endpoint to check authentication
app.get('/api/test-auth', require('./middleware/auth.middleware'), (req, res) => {
  res.json({ 
    message: 'Authentication working!', 
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
