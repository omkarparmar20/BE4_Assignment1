const {initializDatabase} = require("./db/db.connect");
const book = require("./models/books.model");
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
app.use(cors())
app.use(express.json());
initializDatabase();

async function createBook(newBook) {
    try{
        const books = new book(newBook)
        const saveBook = await books.save()
        return saveBook 
    }catch(error){
        throw error;
    }
}

app.post("/books", async(req,res) => {
    try{
        const savedBook = await createBook(req.body)
        res.status(201).json({message: "Book added successfully.", book: savedBook});
    }catch(error){
        res.status(500).json({error: "Failed to add book.", error})
    }
});


// Read all Movies:
async function readAllBooks() {
    try{
        const allBooks = await book.find()
        return allBooks
    }catch(error){
        throw error;
    }
}
 app.get("/books", async(req, res) => {
    try{
        const books = await readAllBooks()
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({error: "No Book found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fecth books."})
    }
 })

 
 // Get books by Title:

 async function readBookByTitle(bookTitle) {
    try{
        const books = await book.findOne({title: bookTitle})
        return books
    }catch(error){
        throw error
    }
 }

 app.get("/books/:title", async (req,res) => {
    try{
        const books = await readBookByTitle(req.params.title)
        if(books){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fecth books"})
    }
 });

 // Get book by Author:

 async function readBookByAuthor(bookAuthor) {
    try{
        const books = await book.findOne({author: bookAuthor})
        return books
    }catch(error){
        throw error;
    }
 }

 app.get("/books/author/:bookAuthor", async (req,res) => {
    try{
        const books = await readBookByAuthor(req.params.bookAuthor);
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fecth books"})
    }
 });

 // Get book by business genre:

 async function readBookByGenre(bookGenre) {
    try{
        const books = await book.find({genre: bookGenre})
        return books
    }catch(error){
        throw error
    }
 }

 app.get("/books/genre/:bookGenre", async(req,res) => {
    try{
        const books = await readBookByGenre(req.params.bookGenre)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fecth books"})
    }
 });

 // Get book release in 2012:

 async function readBookByPublishedYear(bookYear) {
    try{
        const books = await book.find({publishedYear: bookYear})
        return books
    }catch(error){
        throw error
    }
 }

 app.get("/books/publishedYear/:bookYear", async (req,res)=> {
    try{
        const books = await readBookByPublishedYear(req.params.bookYear)
        if(books.length !== 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fecth books"})
    }
 });

 // Update book ratings:

 async function updateBook(bookId, dateToUpdate) {
    try{
        const updatedBook = await book.findByIdAndUpdate(bookId,dateToUpdate,{new: true})
        return updatedBook
    }catch(error){
        console.log("Error in updateing Book", error)
    }
 }

 app.post("/books/:bookId", async(req,res) => {
    try{
        const updatedBook = await updateBook(req.params.bookId, req.body)
        if(updatedBook){
            res.status(200).json({message: "Book updated successfully."})
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update book."})
    }
 });

 // Update book by Title:

 async function updateBooks(bookTitle, dataToUpdate) {
    try {
       
        const query = mongoose.Types.ObjectId.isValid(bookTitle)
            ? { _id: bookTitle } 
            : { title: bookTitle }; 

        const updatedBook = await book.findOneAndUpdate(query, dataToUpdate, { new: true });
        return updatedBook;
    } catch (error) {
        console.error("Error in updating book:", error);
        throw error; 
    }
}

app.post("/books/title/:bookTitle", async (req, res) => {
    try {
        const updatedBook = await updateBooks(req.params.bookTitle, req.body);
        if (updatedBook) {
            res.status(200).json({ message: "Book updated successfully.", book: updatedBook });
        } else {
            res.status(404).json({ error: "Book not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update book." });
    }
});

// Delete book by ID:

async function deleteBook(bookId) {
    try{
        const deletedBook = await book.findByIdAndDelete(bookId)
        return deletedBook
    }catch(error){
        throw error;
    }
}

app.delete("/books/:bookId", async(req,res) => {
    try{
        const deletedBook = await deleteBook(req.params.bookId)
        if(deletedBook){
            res.status(200).json({ message: "Book deleted successfully.", book: deletedBook });
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({ error: "Failed to delete book." });
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on",PORT);
})