import express from "express";
import vars from "./config/vars";
import logger from "./config/logger";

const { port } = vars();

const app = express();

app.listen(port, () => {
  logger.debug(`http://localhost:${port}`);
});
