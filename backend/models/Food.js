const mongoose = require('mongoose');

const macroSchema = new mongoose.Schema(
	{
		protein: { type: Number, required: true, min: 0 },
		carbs: { type: Number, required: true, min: 0 },
		fat: { type: Number, required: true, min: 0 },
	},
	{ _id: false },
);

const foodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		category: { type: String, required: true, trim: true },
		calories: { type: Number, required: true, min: 0 },
		serving: { type: String, required: true, trim: true },
		macros: { type: macroSchema, required: true },
		emoji: { type: String, default: '' },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Food', foodSchema);