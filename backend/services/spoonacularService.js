const axios = require('axios');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_BASE_URL = (process.env.SPOONACULAR_API_BASE_URL || 'https://api.spoonacular.com/recipes/').replace(/\/+$/, '');

const spoonacularClient = axios.create({
	baseURL: SPOONACULAR_API_BASE_URL,
	timeout: 15000,
});

function assertApiKey() {
	if (!SPOONACULAR_API_KEY) {
		const error = new Error('SPOONACULAR_API_KEY is not configured');
		error.status = 500;
		throw error;
	}
}

async function searchRecipes(params = {}) {
	assertApiKey();

	try {
		const response = await spoonacularClient.get('/complexSearch', {
			params: {
				apiKey: SPOONACULAR_API_KEY,
				addRecipeInformation: true,
				addRecipeNutrition: true,
				number: 20,
				...params,
			},
		});

		return Array.isArray(response.data?.results) ? response.data.results : [];
	} catch (error) {
		const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch Spoonacular recipes';
		const wrapped = new Error(message);
		wrapped.status = error.response?.status || 502;
		throw wrapped;
	}
}

async function getRecipeInformation(externalId) {
	assertApiKey();

	try {
		const response = await spoonacularClient.get(`/${externalId}/information`, {
			params: {
				apiKey: SPOONACULAR_API_KEY,
				includeNutrition: true,
			},
		});

		return response.data;
	} catch (error) {
		const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch Spoonacular recipe';
		const wrapped = new Error(message);
		wrapped.status = error.response?.status || 502;
		throw wrapped;
	}
}

module.exports = {
	searchRecipes,
	getRecipeInformation,
};