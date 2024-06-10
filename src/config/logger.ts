import winston from "winston";
import vars from "./vars";

const { release_mode } = vars();

function releaseMode(release_mode: string | undefined) {
  switch (release_mode) {
    case "dev":
      return "debug";
    case "prod":
      return "error";
  }
}

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `{"level": "${level}", "date": "${timestamp}", "message": "${message}"}`;
});

const loggerConfig = {
  level: releaseMode(release_mode),
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/logs.log" }),
  ],
};

const logger = winston.createLogger(loggerConfig);

export default logger;
