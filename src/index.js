import mongoose from 'mongoose';
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './config';
import api from './api';

const app = express();

const { port, databaseName, databaseHost, databasePort, corsHeaders: exposedHeaders, bodyLimit, errorStatus } = config;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ exposedHeaders }));
app.use(bodyParser.json({
	limit : `${bodyLimit}kb`
}));
app.use('/api', api());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || errorStatus).send({
    status: err.status,
    error: err
  });
});

mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  console.error(err);
  console.warn('MongoDB connection error. Please make sure MongoDB is running correctly\n');
  process.exit();
});
mongoose.connection.on('open', function() {
  console.warn('Connection to mongo successfully established\n');

  app.listen(port, function() {
    console.warn(`App is ready on port ${port}\n`);
    console.warn('Press CTRL-C to stop\n');
  });
});

export default app;
