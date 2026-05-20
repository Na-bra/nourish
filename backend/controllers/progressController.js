const Progress = require('../models/Progress');

const getProgress = async (req, res) => {
	try {
		const progress = await Progress.find().sort({ createdAt: -1 });
		return res.json(progress);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch progress' });
	}
};

const getProgressById = async (req, res) => {
	try {
		const item = await Progress.findById(req.params.id);
		if (!item) {
			return res.status(404).json({ message: 'Progress not found' });
		}
		return res.json(item);
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch progress item' });
	}
};

const createProgress = async (req, res) => {
	try {
		const item = await Progress.create(req.body);
		return res.status(201).json(item);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updateProgress = async (req, res) => {
	try {
		const item = await Progress.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!item) {
			return res.status(404).json({ message: 'Progress not found' });
		}
		return res.json(item);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const deleteProgress = async (req, res) => {
	try {
		const item = await Progress.findByIdAndDelete(req.params.id);
		if (!item) {
			return res.status(404).json({ message: 'Progress not found' });
		}
		return res.json({ message: 'Progress deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to delete progress' });
	}
};

module.exports = {
	getProgress,
	getProgressById,
	createProgress,
	updateProgress,
	deleteProgress,
};