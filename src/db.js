import mongoose from "mongoose";

import config from "./config";

const { databaseName, databaseHost, databasePort } = config;

export const dbConnect = (onOpen) => {
  mongoose.connect(
    `mongodb://${databaseHost}:${databasePort}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("error", (err) => {
    console.warn(
      "MongoDB connection error. Please make sure MongoDB is running correctly\n"
    );
    console.error(err);

    process.exitCode = 1;
  });

  mongoose.connection.on("open", onOpen);
};
