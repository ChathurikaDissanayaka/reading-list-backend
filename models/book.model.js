import mongoose from "mongoose";

// Title - Title of the book
// Author - Author of thr book
// ISBN – To fetch the cover image
// Page Count – To track total pages read
// Status – Whether currently reading, completed, or plan to read it
// Cover Image – For a more visually appealing list

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
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
