const mongoose = require('mongoose');
require('dotenv').config();  // Ensure environment variables are loaded

const mongoUri = process.env.MONGODB;

const initializDatabase = async () => {
    if (!mongoUri) {
        console.error("MongoDB URI not found. Please check your .env file.");
        process.exit(1); // Exit the process if the URI is not found
    }

    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
};

module.exports = { initializDatabase };
