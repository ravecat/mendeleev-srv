import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './config';
import api from './api';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	exposedHeaders: config.corsHeaders
}));
app.use(bodyParser.json({
	limit : `${process.env.BODY_LIMIT || config.bodyLimit}kb`
}));
app.use('/api', api());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error data
  res.status(err.status || config.errorStatus);
  res.send({
    message: err.message,
    status: err.status,
    error: err
  });
});

export default app;
