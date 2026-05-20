const MealPlan = require('../models/MealPlan');

const getMealPlans = async (req, res) => {
	try {
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
		return res.json(mealPlan);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch meal plan' });
	}
};

const createMealPlan = async (req, res) => {
	try {
		const mealPlan = await MealPlan.create(req.body);
		return res.status(201).json(mealPlan);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateMealPlan = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}
		return res.json(mealPlan);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteMealPlan = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
		if (!mealPlan) {
			return res.status(404).json({ message: 'Meal plan not found' });
		}
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