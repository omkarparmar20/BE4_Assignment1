const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGODB;

const initializDatabase = async() => {
    await mongoose.connect(mongoUri).then(() => {
        console.log("Connected to Database")
    }).catch((error) => console.log("Error connect to Database", error));
}
module.exports = {initializDatabase};