import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Collections from '../pages/Collections/Collections';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Cart from '../pages/cart/Cart';
import Wishlist from '../pages/Wishlist/Wishlist';
import SearchResults from '../pages/Search/SearchResults';
import ProtectedRoute from '../components/ProtectedRoute';

const Mainroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default Mainroutes