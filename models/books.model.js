const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Ensures that the title is always provided
        trim: true // Strips leading and trailing whitespace
    },
    author: {
        type: String,
        required: true, // Ensures that the author is always provided
        trim: true // Strips leading and trailing whitespace
    },
    publishedYear: {
        type: Number,
        min: 1000, // Enforces a realistic minimum year
        max: new Date().getFullYear(), // Enforces a maximum year (the current year)
        required: true // Ensures that the published year is always provided
    },
    genre: [{
        type: String,
        enum: [
            "Fiction", "Historical", "Romance", "Fantasy", "Mystery", 
            "Thriller", "Non-fiction", "Self-help", "Business", "Autobiography"
        ],
        required: true // Ensures that at least one genre is provided
    }],
    language: {
        type: String,
        required: true, // Ensures the language is always provided
        trim: true // Strips leading and trailing whitespace
    },
    country: {
        type: String,
        required: true, // Ensures the country is always provided
        trim: true // Strips leading and trailing whitespace
    },
    rating: {
        type: Number,
        min: 1, // Validates that the rating is at least 1
        max: 5, // Validates that the rating is at most 5
        required: true // Ensures that the rating is always provided
    },
    summary: {
        type: String,
        required: true, // Ensures the summary is always provided
        trim: true // Strips leading and trailing whitespace
    },
    coverImageUrl: {
        type: String,
        required: true, // Ensures the cover image URL is always provided
        trim: true // Strips leading and trailing whitespace
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
