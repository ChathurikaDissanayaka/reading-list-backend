import express from "express";
import {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Get a book
router.get("/:id", getBook);

// Add a new book
router.post("/", addBook);

// Update a book
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

export default router;
