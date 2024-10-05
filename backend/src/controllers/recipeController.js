const Recipe = require("../models/recipeModel");

// Create Recipe with Image Upload
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, cuisineType, cookingTime } =
      req.body;

    // Get image URL from Multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisineType,
      cookingTime,
      imageUrl, // Save image URL to the database
      author: req.user.id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: "Error creating recipe" });
  }
};

// Update Recipe with Image Upload
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { title, ingredients, instructions, cuisineType, cookingTime } =
      req.body;

    // Update fields
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cuisineType = cuisineType || recipe.cuisineType;
    recipe.cookingTime = cookingTime || recipe.cookingTime;

    // Update image if new image is uploaded
    if (req.file) {
      recipe.imageUrl = `/uploads/${req.file.filename}`;
    }

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe" });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipes" });
  }
};

// Get recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving recipe" });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Recipe.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
};

const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user's recipes" });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
};
