import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:7890/api/recipes");
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initially display all recipes
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = recipes.filter(
      (recipe) =>
        recipe.cuisineType.toLowerCase().includes(value) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(value)
        )
    );
    setFilteredRecipes(filtered);
  };

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-10">
        Eat Your Cravings
      </h2>

      {/* Search Bar */}
      <div className="relative mb-12 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search 2M+ Recipes"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-4 pl-12 pr-4 text-lg ring-2 ring-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FiSearch
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={24}
        />
      </div>

      {/* Recipes Section */}
      <h3 className="text-2xl font-semibold mb-8 text-center">Just For You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center text-xl text-gray-500 col-span-full">
            No recipes found. Try a different search.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
