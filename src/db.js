import mongoose from "mongoose";

import config from "./config";

const { databaseName, databaseHost, databasePort } = config;

export const dbConnect = (onOpen) => {
  mongoose.connect(
    `mongodb://${databaseHost}:${databasePort}/${databaseName}`,
    {
      useNewUrlParser: true,
    }
  );

  mongoose.connection.on("error", (err) => {
    console.warn(
      "MongoDB connection error. Please make sure MongoDB is running correctly\n"
    );
    console.error(err);

    process.exit();
  });

  mongoose.connection.on("open", onOpen);
};
