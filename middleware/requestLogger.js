import colors from "colors";
import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };

  const color = methodColors[req.method] || "white";
  logger.info(
    `${req.method} ${req.originalUrl}`[
      color
    ]
  );
  next();
};

export default requestLogger;
