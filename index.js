require("dotenv").config(); // Load environment variables at the top
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { initializDatabase } = require("./db/db.connect");
const Book = require("./models/books.model"); // Assuming you have a Book model schema

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to Database
initializDatabase();

// Create a new book
app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: savedBook });
    } catch (error) {
        res.status(500).json({ error: "Failed to add book", details: error.message });
    }
});

// Get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "No books found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// Get book by title
app.get("/books/:title", async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book by title" });
    }
});

// Get book by author
app.get("/books/author/:author", async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "Books by this author not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books by author" });
    }
});

// Get book by genre
app.get("/books/genre/:genre", async (req, res) => {
    try {
        const books = await Book.find({ genre: req.params.genre });
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ error: "Books of this genre not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books by genre" });
    }
});

// Update book by ID
app.post("/books/:bookId", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (updatedBook) {
            res.json({ message: "Book updated successfully", book: updatedBook });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
});

// Delete book by ID
app.delete("/books/:bookId", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
        if (deletedBook) {
            res.json({ message: "Book deleted successfully", book: deletedBook });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
