import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../api/api"; // Import BASE_URL
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyFeed = () => {
  const { user } = useContext(AuthContext); // Get the authenticated user context
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7890/api/api/recipes/myrecipes`, // Ensure this endpoint returns user's recipes
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setRecipes(response.data); // Set recipes to the user's recipes
      } catch (error) {
        console.error("Error fetching user's recipes:", error);
        setError("Failed to load recipes"); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []); // Run once when component mounts

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Remove the deleted recipe from UI
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`); // Redirect to edit page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              {/* Render the image if available */}
              {recipe.imageUrl ? (
                <img
                  src={`${BASE_URL}${recipe.imageUrl}`} // Use the BASE_URL from api.js
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-t-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-md mb-4 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}

              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">
                <strong>Cuisine Type:</strong> {recipe.cuisineType}
              </p>
              <p className="text-gray-600">
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </p>
              <p className="text-gray-600">
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-600">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>

              {/* Edit and Delete Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(recipe._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg">No recipes found in your feed.</p>
        )}
      </div>
    </div>
  );
};

export default MyFeed;
