require("dotenv").config(); // Load environment variables at the top
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB; // Ensure this line captures the URI from .env

const initializDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
};

module.exports = { initializDatabase };
