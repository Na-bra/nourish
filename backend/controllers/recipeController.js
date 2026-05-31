const Recipe = require('../models/Recipe');
const { searchRecipes: searchSpoonacularRecipes, getRecipeInformation } = require('../services/spoonacularService');
const { normalizeRecipe, normalizeRecipeList, getRecipeEmoji } = require('../services/recipeNormalizationService');

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function isFresh(recipe) {
	if (!recipe?.lastFetchedAt) return false;
	return Date.now() - new Date(recipe.lastFetchedAt).getTime() < CACHE_TTL_MS;
}

function recipeWithEmoji(recipeDoc) {
	const plain = typeof recipeDoc?.toObject === 'function' ? recipeDoc.toObject() : recipeDoc;
	if (!plain) return plain;
	return {
		...plain,
		emoji: plain.emoji || getRecipeEmoji(plain.name, plain.tags),
	};
}

async function upsertRecipe(normalizedRecipe) {
	if (!normalizedRecipe?.externalId) return null;
	const saved = await Recipe.findOneAndUpdate(
		{ externalId: normalizedRecipe.externalId },
		{ $set: normalizedRecipe },
		{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
	);
	return recipeWithEmoji(saved);
}

async function searchCachedRecipes(query, filters = {}) {
	const criteria = {};
	if (query) criteria.name = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
	const tagFilters = [];
	if (filters.diet) tagFilters.push(new RegExp(filters.diet, 'i'));
	if (filters.cuisine) tagFilters.push(new RegExp(filters.cuisine, 'i'));
	if (tagFilters.length) criteria.tags = { $all: tagFilters };
	if (filters.maxCalories) criteria.calories = { $lte: Number(filters.maxCalories) };
	return Recipe.find(criteria).sort({ lastFetchedAt: -1, updatedAt: -1 }).limit(20);
}

async function refreshRecipeIfNeeded(existingRecipe, recipeId) {
	if (existingRecipe && isFresh(existingRecipe)) {
		return recipeWithEmoji(existingRecipe);
	}

	if (existingRecipe && !existingRecipe.externalId) {
		return recipeWithEmoji(existingRecipe);
	}

	if (!existingRecipe && !recipeId) return null;

	const remote = await getRecipeInformation(recipeId || existingRecipe.externalId);
	const normalized = normalizeRecipe(remote);
	return upsertRecipe(normalized);
}

const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find().sort({ createdAt: -1 });
		return res.json(recipes.map(recipeWithEmoji));
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch recipes' });
	}
};

const searchRecipes = async (req, res) => {
	try {
		const query = String(req.query.q || req.query.query || '').trim();
		const diet = String(req.query.diet || '').trim();
		const cuisine = String(req.query.cuisine || '').trim();
		const maxCalories = req.query.maxCalories ? Number(req.query.maxCalories) : undefined;

		const cachedRecipes = await searchCachedRecipes(query, { diet, cuisine, maxCalories });
		const freshCached = cachedRecipes.filter((recipe) => isFresh(recipe));
		if (freshCached.length && (!query || freshCached.length >= 5)) {
			return res.json(freshCached.map(recipeWithEmoji));
		}

		const spoonacularRecipes = await searchSpoonacularRecipes({
			query,
			diet: diet || undefined,
			cuisine: cuisine || undefined,
			maxCalories,
		});

		const normalizedRecipes = normalizeRecipeList(spoonacularRecipes);
		const savedRecipes = [];
		for (const recipe of normalizedRecipes) {
			const saved = await upsertRecipe(recipe);
			if (saved) savedRecipes.push(saved);
		}
		return res.json(savedRecipes);
	} catch (error) {
		return res.status(error.status || 500).json({ message: error.message || 'Failed to search recipes' });
	}
};

const getRecipeById = async (req, res) => {
	try {
		const { id } = req.params;
		let recipe = await Recipe.findOne({ externalId: String(id) });
		if (!recipe && /^[a-f0-9]{24}$/i.test(String(id))) {
			recipe = await Recipe.findById(id);
		}

		const refreshed = await refreshRecipeIfNeeded(recipe, id);
		if (refreshed) {
			return res.json(refreshed);
		}

		return res.status(404).json({ message: 'Recipe not found' });
	} catch (error) {
		return res.status(error.status || 500).json({ message: error.message || 'Failed to fetch recipe' });
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
	searchRecipes,
	getRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
};