const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const db = require('./config/db');
db();
const authRoutes = require('./routes/Auth.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/Products.routes'); 
const cartRoutes = require('./routes/cart.routes');

const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // cookies / jwt ke liye MUST
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
