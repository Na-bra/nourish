const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfCurrentWeek() {
	const date = new Date();
	const day = date.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	const monday = new Date(date.setDate(diff));
	monday.setHours(0, 0, 0, 0);
	return monday;
}

function buildEmptyMealSlots() {
	return { breakfast: [], lunch: [], dinner: [] };
}

function recipePlanId(recipe) {
	return recipe.externalId || String(recipe._id);
}

async function buildDefaultMealPlan(userId) {
	const recipes = await Recipe.find().sort({ createdAt: -1 });
	if (!recipes.length) {
		return MealPlan.create({
			userId,
			weekStart: startOfCurrentWeek(),
			days: weekDays.map((day) => ({ day, meals: buildEmptyMealSlots() })),
		});
	}

	const pickRecipe = (index) => recipes[index % recipes.length];

	const days = weekDays.map((day, dayIndex) => ({
		day,
		meals: {
			breakfast: [{ recipeId: recipePlanId(pickRecipe(dayIndex)), portion: 1 }],
			lunch: [{ recipeId: recipePlanId(pickRecipe(dayIndex + 1)), portion: 1 }],
			dinner: [{ recipeId: recipePlanId(pickRecipe(dayIndex + 2)), portion: 1 }],
		},
	}));

	return MealPlan.create({ userId, weekStart: startOfCurrentWeek(), days });
}

const getMealPlans = async (req, res) => {
	try {
		if (req.user) {
			let mealPlan = await MealPlan.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
			if (!mealPlan) mealPlan = await buildDefaultMealPlan(req.user._id);
			return res.json([mealPlan]);
		}

		const mealPlans = await MealPlan.find().sort({ createdAt: -1 });
		return res.json(mealPlans);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch meal plans' });
	}
};

const getMealPlanById = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findById(req.params.id);
		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}
		if (req.user && String(mealPlan.userId) !== String(req.user._id)) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		return res.json(mealPlan);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch meal plan' });
	}
};

const createMealPlan = async (req, res) => {
	try {
		const payload = { ...req.body };
		if (req.user) payload.userId = req.user._id;
		const mealPlan = await MealPlan.create(payload);
		return res.status(201).json(mealPlan);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateMealPlan = async (req, res) => {
	try {
		const existing = await MealPlan.findById(req.params.id);
		if (!existing) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}
		if (req.user && String(existing.userId) !== String(req.user._id)) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		return res.json(mealPlan);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteMealPlan = async (req, res) => {
	try {
		const existing = await MealPlan.findById(req.params.id);
		if (!existing) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}
		if (req.user && String(existing.userId) !== String(req.user._id)) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		await MealPlan.findByIdAndDelete(req.params.id);
		return res.json({ message: 'Meal plan deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to delete meal plan' });
	}
};

module.exports = {
	getMealPlans,
	getMealPlanById,
	createMealPlan,
	updateMealPlan,
	deleteMealPlan,
};