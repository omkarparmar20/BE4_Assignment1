const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database:", error);
        process.exit(1); // Exit the process if the database connection fails
    }
};

module.exports = { initializDatabase };
