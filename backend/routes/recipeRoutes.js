const express = require('express');
const {
	getRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;