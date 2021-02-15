import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import logger from "morgan";

import { elements, root } from "./api";
import config from "./config";
import { dbConnect } from "./db";

const app = express();

const {
  mode,
  port,
  databasePort,
  databaseHost,
  corsHeaders: exposedHeaders,
  bodyLimit,
} = config;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ exposedHeaders }));
app.use(
  bodyParser.json({
    limit: `${bodyLimit}kb`,
  })
);

// API endpoints
app.use("/", root);
app.use("/elements", elements);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    status: err.status,
    error: err,
  });
});

dbConnect(() => {
  console.warn(
    `Connection to ${databaseHost}:${databasePort} successfully established\n`
  );

  if (process.env.NODE_ENV !== "test") {
    app.listen(port, function () {
      console.warn(`App is ready on port ${port} in ${mode} mode\n`);
      console.warn("Press CTRL-C to stop\n");
    });
  }
});

export default app;
