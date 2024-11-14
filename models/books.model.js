const mongoose = require("mongoose");
const Books = new mongoose.Schema({
    title:{
        type: String,
    },
    author:{
        type:String,
    },
    publishedYear:{
        type:Number,
    },
    genre:[{
        type:String,
        enum: ["Fiction", "Historical", "Romance", "Fantasy", "Mystery", "Thriller", "Non-fiction", "Self-help", "Business", "Autobiography"],
    }],
    language:{
        type: String,
    },
    country:{
        type:String,
    },
    rating:{
        type: Number,
    },
    summary:{
        type:String,
    },
    coverImageUrl:{
        type:String,
    },
})

const Book = mongoose.model("Book",Books);
module.exports = Book;