import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation to check if it's an image
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Preview the image
        setError(""); // Clear any previous error
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]); // Add a new empty ingredient input
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients); // Remove ingredient at index
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear the error on form submit
    setSuccessMessage(""); // Clear success message
    setLoading(true); // Set loading state

    if (cookingTime <= 0) {
      setError("Cooking time must be a positive number.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(); // Create FormData to handle file upload
      formData.append("title", title);
      formData.append("ingredients", JSON.stringify(ingredients)); // Use JSON.stringify for array
      formData.append("instructions", instructions);
      formData.append("cuisineType", cuisineType);
      formData.append("cookingTime", cookingTime);
      if (image) {
        formData.append("image", image); // Add image to FormData if available
      }

      await axios.post("http://localhost:7890/api/recipes", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      setSuccessMessage("Recipe uploaded successfully!"); // Set success message
      // Reset form fields
      setTitle("");
      setIngredients([]);
      setInstructions("");
      setCuisineType("");
      setCookingTime("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setError("Error creating recipe");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upload Recipe</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-4 py-2 w-3/4 md:w-1/2 lg:w-1/3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="border px-4 py-2 w-4/5 md:w-2/3 lg:w-1/2"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="text-blue-500">
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border px-4 py-2 w-full md:w-3/4 lg:w-2/3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cuisine Type</label>
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="border px-4 py-2 w-1/2 md:w-1/3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="border px-4 py-2 w-1/3 md:w-1/4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image file change
            className="border px-4 py-2 w-3/5"
          />
        </div>
  
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-48 h-48 object-cover rounded-md"
            />
          </div>
        )}
  
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {loading ? "Uploading..." : "Upload Recipe"} {/* Loading state */}
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;
