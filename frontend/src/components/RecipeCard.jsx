import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi"; // Icon for "Get more details"
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { BASE_URL } from "../api/api"; // Import BASE_URL

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe._id}`} aria-label={`View recipe for ${recipe.title}`}>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 relative transition transform hover:-translate-y-1 hover:shadow-xl">
        {/* Image at the top */}
        {recipe.imageUrl ? (
          <img
            src={`${BASE_URL}${recipe.imageUrl}`} // Use the BASE_URL from api.js
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-t-md mb-4"
            onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/fallback-image.jpg'; }} // Fallback image
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-md mb-4 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}

        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4 truncate">{recipe.instructions}</p>

        {/* "Click to Know More" with Icon */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-2 text-blue-500 hover:underline">
          <span>Click to Know More</span>
          <FiArrowRightCircle size={20} />
        </div>
      </div>
    </Link>
  );
};

// Prop Types for validation
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
