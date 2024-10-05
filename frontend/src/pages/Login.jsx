import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl">
        {/* Sign In Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Sign in</h2>


          {/* <p className="text-gray-500 mb-4 text-center">or use your account</p> */}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-right text-sm text-red-500 mb-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
            <button className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition">
              SIGN IN
            </button>
          </form>
        </div>

        {/* Welcome Back Section */}
        <div className="w-full md:w-1/2 rounded-lg bg-red-500 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold">Hello again!</h2>
          <p className="mb-4 text-center">
            Enter your credentials to access your account and stay connected
          </p>
          <button
            onClick={() => navigate("/register")}
            className="border border-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 transition"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
