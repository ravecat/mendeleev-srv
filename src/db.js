import mongoose from 'mongoose';
import config from './config';

export default callback => {
  const { databaseName, databaseHost, databasePort } = config;

	mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`, { useNewUrlParser: true });

	mongoose.connection.on('error', err => {
		console.error(err);
		console.warn('MongoDB connection error. Please make sure MongoDB is running correctly\n');
		
		process.exit();
	});

	mongoose.connection.on('open', function() {
		console.warn('Connection to mongo successfully established\n');

		callback();
	});
};
