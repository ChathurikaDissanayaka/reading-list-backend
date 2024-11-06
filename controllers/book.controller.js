import Book from "../models/book.model.js";
import logger from "../config/logger.js";
import fetchBookCover from "../utils/fetchBookCover.js";

// @desc Get all books
// @route GET /books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    logger.info("Fetched books successfully");
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    logger.error("Error fetching books");
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a book
// @route GET /books/:id
export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      logger.error("Error fetching book");
      return res.status(400).send({
        message: "Error fetching book",
      });
    }

    logger.info("Fetched book successfully");
    res.status(200).json(book);
  } catch (error) {
    logger.error("Error fetching book");
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new book
// @route POST /books
export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, pageCount, status } = req.body;
    if (!title || !author || !isbn || !pageCount || !status) {
      logger.error("Missing one or more required fields");
      return res.status(400).send({
        message: "Missing one or more required fields",
      });
    }

    const coverImage = await fetchBookCover(isbn);

    const newBook = {
      title,
      author,
      isbn,
      pageCount,
      status,
      coverImage,
    };

    const book = await Book.create(newBook);
    logger.info("Added book with successfully");
    res.status(201).send(book);
  } catch (error) {
    logger.error("Error adding book");
    res.status(500).send({ message: error.message });
  }
};

// @desc Update a book
// @route PUT /books/:id
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pageCount, status } = req.body;

    const existingBook = await Book.findById(id);

    if (!existingBook) {
      logger.error("Book not found");
      return res.status(400).send({
        message: "Book not found",
      });
    }

    let coverImage = existingBook.coverImage;

    if (isbn && existingBook.isbn !== isbn) {
      coverImage = await fetchBookCover(isbn);
      logger.info(`Updated cover image for new ISBN ${isbn}`);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: title || existingBook.title,
        author: author || existingBook.author,
        isbn: isbn || existingBook.isbn,
        pageCount: pageCount || existingBook.pageCount,
        status: status || existingBook.status,
        coverImage,
      },
      { new: true }
    );

    logger.info("Updated book successfully");
    res.status(200).json({ message: "Book has been updated successfully." });
  } catch (error) {
    logger.error("Error updating book");
    res.status(500).send({ message: error.message });
  }
};

// @desc Delete a book
// @route Delete /books/:id
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      logger.error("Error fetching book");
      return res.status(400).send({
        message: "Error fetching book",
      });
    }

    logger.info("Deleted book successfully");
    res.status(200).json({ message: "Book has been deleted." });
  } catch (error) {
    logger.error("Error deleting book");
    res.status(500).send({ message: error.message });
  }
};
