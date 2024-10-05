import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../api/api";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7890/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div> {/* Add your loading spinner here */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      {recipe.imageUrl ? (
        <img
          src={`${BASE_URL}${recipe.imageUrl}`}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h1>
      <p className="text-center">
        <strong>Cuisine Type:</strong> {recipe.cuisineType}
      </p>
      <p className="text-center">
        <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
      </p>
      <p className="text-center">
        <strong>Ingredients:</strong>
      </p>
      <ul className="list-disc ml-5 mb-4 text-center">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className="text-center">
        <strong>Instructions:</strong>
      </p>
      <p className="text-center">{recipe.instructions}</p>
      <button
        onClick={() => navigate("/")}
        aria-label="Back to recipes"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Recipes
      </button>
    </div>
  );
};

export default RecipeDetails;
