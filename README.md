# BagStore - E-commerce Application

A full-stack e-commerce application with React frontend and Node.js backend, featuring admin dashboard integration.

## Features

### Frontend
- User authentication (login/register)
- Admin authentication with separate login
- Protected routes for admin dashboard
- **Real-time product display** from backend API
- **Search and filter functionality** for products
- **Category-based product organization**
- **Responsive product cards** with image support
- Cart functionality with context management
- Responsive design with Tailwind CSS

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose
- Cloudinary for image storage
- JWT authentication with cookies
- Role-based access control (user/admin)
- CRUD operations for products and users

### Admin Dashboard
- Real-time stats (users, products count)
- User management (view, delete users)
- Product management (add, view, delete products)
- **Cloudinary image upload** for products
- Secure admin-only access

### Product Display
- **Home page** with all products from database
- **Collections page** with filtering and sorting
- **Search functionality** by product name/description
- **Category filtering** and organization
- **Image support** for both old (URL) and new (Cloudinary) formats
- **Responsive grid layout** for all screen sizes

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/adminlogin` - Admin login
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products
- `POST /api/products/addproduct` - Add product (admin only)
- `GET /api/products/getproduct/:id` - Get product by ID
- `PUT /api/products/updateproduct/:id` - Update product (admin only)
- `DELETE /api/products/deleteproduct/:id` - Delete product (admin only)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/stats` - Get dashboard stats (admin only)

### Cart
- `POST /api/cart/add` - Add to cart
- `GET /api/cart` - Get user cart
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

## Setup Instructions
`
### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

   Backend will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## Usage

### User Access
1. Visit `http://localhost:5173`
2. Register a new account or login
3. Browse products and add to cart

### Admin Access
1. Visit `http://localhost:5173/login`
2. Toggle to "Admin" login
3. Use admin credentials from `.env` file
4. Access admin dashboard at `/admin`

### Admin Dashboard Features
- **Dashboard**: View total users and products count
- **Users**: View all registered users, delete users
- **Products**: View all products, delete products
- **Add Product**: Add new products with image upload

## Technology Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary for image storage
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests
- Multer for file uploads

## Security Features
- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- CORS configuration
- Input validation

## Project Structure
```
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
└── README.md
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request