import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { getImageUrl } from "../utils/imageUtils";
import SearchDropdown from "./SearchDropdown";
import {
  FaSearch,
  FaTimes,
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const LINKS = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Collection", to: "/collections" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // 🔥 Dummy States (later connect with Context API)

  const [query, setQuery] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear search after submitting
      setMobileSearchOpen(false); // Close mobile search
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  // Calculate total cart items (only for authenticated users)
  const totalCartItems = user && user.isAuthenticated 
    ? cartItems.reduce((total, item) => total + item.qty, 0) 
    : 0;

  // Calculate wishlist items count (only for authenticated users)
  const totalWishlistItems = user && user.isAuthenticated 
    ? wishlistItems.length 
    : 0;

  return (
    <header className="w-full bg-white shadow-sm relative">
      {/* ================= TOP BAR ================= */}
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <div className="text-2xl font-semibold italic text-gray-800">
            WatchStore
          </div>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="relative w-full max-w-lg">
            <form
              onSubmit={submitSearch}
              className="relative"
            >
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => {
                  // Delay hiding to allow clicking on dropdown items
                  setTimeout(() => setShowSearchDropdown(false), 200);
                }}
                placeholder="What are you looking for?"
                className="w-full pl-5 pr-14 py-2.5 rounded-full bg-gray-100 focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2.5 rounded-full"
              >
                <FaSearch />
              </button>
            </form>
            
            {showSearchDropdown && (
              <SearchDropdown 
                query={query} 
                onClose={() => {
                  setShowSearchDropdown(false);
                  setQuery("");
                }}
              />
            )}
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Wishlist */}
          <NavLink to="/wishlist" className="relative text-gray-700">
            <FaHeart />
            {totalWishlistItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {totalWishlistItems}
              </span>
            )}
          </NavLink>

          {/* 🛒 Cart */}
          <NavLink to="/cart" className="relative text-gray-700">
            <FaShoppingCart className="text-lg" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                {totalCartItems}
              </span>
            )}
          </NavLink>

          {/* Auth Section */}
          {user && user.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <FaUser />
                {user.name || 'User'}
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-sm text-gray-600 mb-2">
                      {user.email}
                    </div>
                    {user.isAdmin && (
                      <NavLink
                        to="/admin"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/register" className="text-sm text-gray-700">
                Register
              </NavLink>

              <NavLink
                to="/login"
                className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm"
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* ================= MOBILE ICONS ================= */}
        <div className="flex items-center ml-auto md:hidden gap-3">
          <button
            onClick={() => setMobileSearchOpen((p) => !p)}
            className="text-gray-700 text-lg"
          >
            {mobileSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>

          {/* Mobile Wishlist */}
          <button
            onClick={() => setWishlistOpen((s) => !s)}
            className="relative text-gray-700 text-lg"
          >
            <FaHeart />
          </button>

          {/* Mobile Cart */}
          <NavLink to="/cart" className="relative text-gray-700 text-lg">
            <FaShoppingCart />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full px-1">
                {totalCartItems}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="text-gray-700 text-lg"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {mobileSearchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <form onSubmit={submitSearch} className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-4 pr-12 py-2.5 rounded-full bg-gray-100 text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-3">
            {LINKS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 py-2"
              >
                {item.name}
              </NavLink>
            ))}

            <div className="border-t pt-2" />

            {user && user.isAuthenticated ? (
              <>
                <div className="text-sm text-gray-600 py-2">
                  Welcome, {user.name}
                </div>
                {user.isAdmin && (
                  <NavLink
                    to="/admin"
                    className="py-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/register" className="py-2 text-gray-700">
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  className="w-24 py-2 bg-gray-900 text-white rounded-full text-sm text-center"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= WISHLIST PANEL (DESKTOP) ================= */}
      {wishlistOpen && (
        <div className="hidden md:block absolute right-4 top-full mt-3 w-72 bg-white border rounded shadow z-50 p-3">
          <div className="font-semibold mb-2">Wishlist</div>
          {totalWishlistItems === 0 ? (
            <div className="text-sm text-gray-500">No items in wishlist</div>
          ) : (
            <ul className="space-y-2">
              {wishlistItems.map((item, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <img 
                    src={getImageUrl(item.imgSrc)} 
                    alt={item.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
