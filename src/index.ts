import express from "express";
import vars from "./config/vars";
import logger from "./config/logger";
import db from "./config/db";
import router from "./routes/router";

const { database_uri, port } = vars();

const app = express();

app.use(router);

db(database_uri)
  .then(() => {
    app.listen(port, () => {
      logger.debug("database successfully connected");
      logger.debug(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error(`startup server error: ${error}`);
  });
