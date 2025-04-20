const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});


router.put('/:id', async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
