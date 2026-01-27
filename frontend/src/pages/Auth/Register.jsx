import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔐 Register Logic
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await registerUser(data.name, data.email, data.password);
      
      if (result.success) {
        success("Registration Successful ✅");
        navigate("/login");
      } else {
        error(result.message);
      }
    } catch (error) {
      error("Registration Failed");
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
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Register</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-600 bg-gray-700 text-white p-2 mb-2 rounded"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Minimum 4 characters",
            },
          })}
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm mt-3 text-center text-gray-300">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-1 hover:text-blue-300">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
