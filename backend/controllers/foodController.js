const Food = require('../models/Food');

const getFoods = async (req, res) => {
	try {
		const foods = await Food.find().sort({ createdAt: -1 });
		return res.json(foods);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch foods' });
	}
};

const getFoodById = async (req, res) => {
	try {
		const food = await Food.findById(req.params.id);
		if (!food) {
			return res.status(404).json({ message: 'Food not found' });
		}
		return res.json(food);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch food' });
	}
};

const createFood = async (req, res) => {
	try {
		const food = await Food.create(req.body);
		return res.status(201).json(food);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateFood = async (req, res) => {
	try {
		const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!food) {
			return res.status(404).json({ message: 'Food not found' });
		}
		return res.json(food);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteFood = async (req, res) => {
	try {
		const food = await Food.findByIdAndDelete(req.params.id);
		if (!food) {
			return res.status(404).json({ message: 'Food not found' });
		}
		return res.json({ message: 'Food deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to delete food' });
	}
};

module.exports = {
	getFoods,
	getFoodById,
	createFood,
	updateFood,
	deleteFood,
};