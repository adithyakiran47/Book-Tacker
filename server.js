const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/bookTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  status: String,
});

const Book = mongoose.model("Book", bookSchema);




app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Error retrieving books");
  }
});


app.post("/books", async (req, res) => {
  const { title, author, status } = req.body;
  const newBook = new Book({ title, author, status });

  try {
    await newBook.save();
    res.status(201).send("Book added");
  } catch (err) {
    res.status(500).send("Error adding book");
  }
});


app.put("/books/:id", async (req, res) => {
  const { title, author, status } = req.body;
  try {
    await Book.findByIdAndUpdate(req.params.id, { title, author, status });
    res.send("Book updated");
  } catch (err) {
    res.status(500).send("Error updating book");
  }
});


app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Book deleted");
  } catch (err) {
    res.status(500).send("Error deleting book");
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
