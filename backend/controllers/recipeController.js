const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find().sort({ createdAt: -1 });
		return res.json(recipes);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch recipes' });
	}
};

const getRecipeById = async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		return res.json(recipe);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch recipe' });
	}
};

const createRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.create(req.body);
		return res.status(201).json(recipe);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		return res.json(recipe);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteRecipe = async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndDelete(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: 'Recipe not found' });
		}
		return res.json({ message: 'Recipe deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to delete recipe' });
	}
};

module.exports = {
	getRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
};