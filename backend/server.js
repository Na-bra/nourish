const path = require('path');

require('dotenv').config({
	path: path.resolve(__dirname, '../.env'),
});

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, '0.0.0.0', () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Server failed to start:', error.message);
		process.exit(1);
	}
};

startServer(); 
