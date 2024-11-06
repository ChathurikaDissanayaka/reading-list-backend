import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/books.routes.js";
import logger from "./config/logger.js";
import requestLogger from "./middleware/requestLogger.js";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const MongoDbUrl = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/books", booksRoute);

mongoose
  .connect(MongoDbUrl)
  .then(() => {
    logger.info("Database connected");
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Database connection failed.");
    console.log(err);
  });
