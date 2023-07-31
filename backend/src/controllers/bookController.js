const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");

// GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/books/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/books
router.post("/", async (req, res) => {
  const { title, writer, coverImage, price, tag } = req.body;
  try {
    const newBook = await bookService.createBook(
      title,
      writer,
      coverImage,
      price,
      tag
    );
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add more route handlers for creating, updating, and deleting books as needed

module.exports = router;
