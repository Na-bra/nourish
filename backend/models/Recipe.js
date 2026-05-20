const mongoose = require('mongoose');

const macroSchema = new mongoose.Schema(
	{
		protein: { type: Number, required: true, min: 0 },
		carbs: { type: Number, required: true, min: 0 },
		fat: { type: Number, required: true, min: 0 },
	},
	{ _id: false },
);

const ingredientSchema = new mongoose.Schema(
	{
		food: { type: String, required: true, trim: true },
		amount: { type: String, required: true, trim: true },
	},
	{ _id: false },
);

const recipeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		time: { type: Number, required: true, min: 1 },
		servings: { type: Number, required: true, min: 1 },
		calories: { type: Number, required: true, min: 0 },
		difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
		tags: [{ type: String, trim: true }],
		emoji: { type: String, default: '' },
		ingredients: { type: [ingredientSchema], default: [] },
		steps: [{ type: String, trim: true }],
		macros: { type: macroSchema, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Recipe', recipeSchema);