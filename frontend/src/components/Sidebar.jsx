import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaChevronDown,
  FaUserCircle,
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Title */}
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Recipe App
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="flex items-center text-gray-400 hover:text-white transition duration-300"
            >
              <FaHome size={18} className="mr-1" />
              Browse Recipes
            </Link>
            <Link
              to="/settings"
              className="flex items-center text-gray-400 hover:text-white transition duration-300"
            >
              <FaCog size={18} className="mr-1" />
              Settings
            </Link>
            <Link
              to="/faq"
              className="flex items-center text-gray-400 hover:text-white transition duration-300"
            >
              <FaQuestionCircle size={18} className="mr-1" />
              FAQ
            </Link>
          </nav>

          {/* Profile/Logout Section */}
          <div className="relative">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer flex items-center space-x-2 text-gray-400 hover:text-white transition duration-300"
            >
              <FaUserCircle size={24} />
              <span>{user?.username || "Guest"}</span>
              <FaChevronDown size={16} />
            </div>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg z-20">
                <ul className="py-2 text-sm text-gray-300">
                  <li>
                    <Link
                      to="/myfeed"
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      My Feed
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload-recipe"
                      className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      Upload Recipe
                    </Link>
                  </li>
                  <li className="border-t border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 hover:text-white"
                    >
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
