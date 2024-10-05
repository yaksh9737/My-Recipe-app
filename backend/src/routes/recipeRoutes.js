const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} = require("../controllers/recipeController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); 

const router = express.Router();

router.post("/", protect, upload.single("image"), createRecipe);

router.get("/", getRecipes);

router.get("/myrecipes", protect, getUserRecipes);

router.get("/:id", getRecipeById);
router.put("/:id", protect, upload.single("image"), updateRecipe); 
router.delete("/:id", protect, deleteRecipe);

module.exports = router;