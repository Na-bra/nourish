const express = require('express');
const auth = require('../middleware/auth');
const {
	getRecipes,
	searchRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipeById);
router.post('/', auth, createRecipe);
router.patch('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);

module.exports = router;