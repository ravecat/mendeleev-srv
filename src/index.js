import http from 'http'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import config from './config.json';
import indexRouter from './routes/index'
import dotenv from 'dotenv'

dotenv.config()

let app = express();
app.server = http.createServer(app);

var port = normalizePort(process.env.PORT || config.port);

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

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || config.errorStatus);
  res.send({
    message: err.message,
    status: err.status,
    error: err
  });
});

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });

app.server.listen(port);
app.server.on('error', onError);
app.server.on('listening', function() {
  console.log('Server is ready')
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
