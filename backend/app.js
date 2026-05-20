const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const validateObjectId = require('./middleware/validateObjectId');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const progressRoutes = require('./routes/progressRoutes');
const groceryListRoutes = require('./routes/groceryListRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple request logger
app.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

// attach optional auth
app.use(auth);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/grocery-lists', groceryListRoutes);

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }));

// API 404 handler
app.use('/api', notFound);

// global error handler
app.use(errorHandler);

module.exports = app;
