const GroceryList = require('../models/GroceryList');

const getGroceryLists = async (req, res) => {
	try {
		const groceryLists = await GroceryList.find().sort({ createdAt: -1 });
		return res.json(groceryLists);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch grocery lists' });
	}
};

const getGroceryListById = async (req, res) => {
	try {
		const groceryList = await GroceryList.findById(req.params.id);
		if (!groceryList) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}
		return res.json(groceryList);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch grocery list' });
	}
};

const createGroceryList = async (req, res) => {
	try {
		const groceryList = await GroceryList.create(req.body);
		return res.status(201).json(groceryList);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateGroceryList = async (req, res) => {
	try {
		const groceryList = await GroceryList.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!groceryList) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}
		return res.json(groceryList);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteGroceryList = async (req, res) => {
	try {
		const groceryList = await GroceryList.findByIdAndDelete(req.params.id);
		if (!groceryList) {
			return res.status(404).json({ message: 'Grocery list not found' });
		}
		return res.json({ message: 'Grocery list deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to delete grocery list' });
	}
};

module.exports = {
	getGroceryLists,
	getGroceryListById,
	createGroceryList,
	updateGroceryList,
	deleteGroceryList,
};