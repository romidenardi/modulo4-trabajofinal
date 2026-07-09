import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD/MM/YYYY HH:mm:ss",
    }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message }) => {
          return `[${level}] ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;