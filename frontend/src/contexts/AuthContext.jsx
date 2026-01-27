import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("=== AUTH CHECK ===");
      // Check if there's a stored user in localStorage
      const storedUser = localStorage.getItem('user');
      console.log("Stored user in localStorage:", storedUser);
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const userState = {
          ...userData,
          isAuthenticated: true,
          isAdmin: userData.role === 'admin'
        };
        console.log("Setting user state:", userState);
        setUser(userState);
      } else {
        console.log("No stored user found");
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, isAdmin = false) => {
    try {
      console.log("=== LOGIN ATTEMPT ===");
      console.log("Email:", email, "IsAdmin:", isAdmin);
      
      const endpoint = isAdmin ? '/auth/adminlogin' : '/auth/login';
      const res = await API.post(endpoint, { email, password });
      
      console.log("Login response:", res.data);
      
      if (res.data.user) {
        const userData = {
          ...res.data.user,
          isAuthenticated: true,
          isAdmin: res.data.user.role === 'admin'
        };
        
        console.log("Setting user after login:", userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(res.data.user));
  localStorage.setItem('token', res.data.token)

        
        return { success: true, user: res.data.user };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', { name, email, password });
      return { success: true, message: res.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};