import axios from "axios";
import logger from "../config/logger.js";

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Use to fetch the cover image of a book by using ISBN
const fetchBookCover = async (isbn) => {
  const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`;
  let coverImage = "";
  try {
    const res = await axios.get(googleBooksUrl);
    if (res.data.totalItems > 0) {
      coverImage = res.data.items[0].volumeInfo.imageLinks?.thumbnail;
      return coverImage;
    } else {
      logger.warn(`No book found for ISBN ${isbn}`);
      return "";
    }
  } catch (error) {
    logger.error(`Error fetching cover image: ${error.message}`);
    return "";
  }
};

export default fetchBookCover;
