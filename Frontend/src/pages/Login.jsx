import React, { useContext, useState } from 'react';
import loginImg from '../assets/signup.jpg';
import toast from "react-hot-toast";
import api from "../lib/axios";
import { API_PATHS } from "../lib/apiPath";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext'; // Ensure this matches your filename case

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await api.post(API_PATHS.AUTH.LOGIN, payload);
      const { token } = response.data;
      
      console.log(response)
      if (token) {
        // This updates the context AND saves the token to localStorage
        updateUser(response.data);
        toast.success("Login Successful");
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Login failed, check your credentials";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <img src={loginImg} alt="Login Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Welcome Back to <span className="text-[#005F60]">CollabX</span>
            </h1>
            <p className="mt-2 text-gray-600">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-100" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-100" required />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#006D77] text-white font-bold py-3.5 rounded-lg mt-2">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Does not have an account? <a href="/signup" className="font-bold text-[#006D77]">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;