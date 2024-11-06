import winston from "winston";

const LOG_LEVEL = process.env.LOG_LEVEL;

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
};

winston.addColors(colors);

const logger = winston.createLogger({
  level: LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss A",
    }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
