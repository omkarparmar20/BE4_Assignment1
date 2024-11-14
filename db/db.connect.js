const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializDatabase = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // If using older versions of Mongoose (<6.0)
            useFindAndModify: false // If using older versions of Mongoose (<6.0)
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
};

module.exports = { initializDatabase };
