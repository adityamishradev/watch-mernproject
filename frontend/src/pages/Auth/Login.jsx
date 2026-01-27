import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔐 Login Logic
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password, isAdmin);
      
      if (result.success) {
        success("Login Successful ✅");
        
        // Redirect based on user role
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        error(result.message);
      }
    } catch (error) {
      error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        {/* Login Type Toggle */}
        <div className="flex mb-4">
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-2 px-4 rounded-l ${
              !isAdmin 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-2 px-4 rounded-r ${
              isAdmin 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-600 bg-gray-700 text-white p-2 mb-2 rounded"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-600 bg-gray-700 text-white p-2 mb-2 rounded"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 mt-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {!isAdmin && (
          <p className="text-sm mt-3 text-center text-gray-300">
            Don't have an account?
            <Link to="/register" className="text-blue-400 ml-1 hover:text-blue-300">
              Register
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
