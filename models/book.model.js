import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Page Count – Helpful if you want to track total pages read.
// Status – Whether you're currently reading, completed, or plan to read it.
// ISBN – For future reference or to look up more book details.
// Cover Image – For a more visually appealing list.

const Book = mongoose.model("Book", bookSchema);

export default Book;
