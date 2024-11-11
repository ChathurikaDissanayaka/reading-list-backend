import axios from "axios";
import logger from "../config/logger.js";

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Use to fetch the cover image of a book by using ISBN
const fetchBookDetails = async (isbn) => {
  let coverImage = "";
  let description = "Description not found";
  try {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`;
    const res = await axios.get(googleBooksUrl);
    if (res.data.totalItems > 0) {
      const book = res.data.items[0].volumeInfo;
      coverImage = book.imageLinks?.thumbnail.replace(/^http:/, 'https:');
      console.log(coverImage)
      description = book.description;
      return { coverImage, description };
    }
  } catch (error) {
    logger.error(`Error fetching cover image: ${error.message}`);
    return { coverImage, description };
  }
};

export default fetchBookDetails;
