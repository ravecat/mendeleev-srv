import mongoose from 'mongoose';
import config from './config';

export default callback => {
  const { databaseName, databaseHost } = config;

	mongoose.connect(`mongodb://${databaseHost}/${databaseName}`, { useNewUrlParser: true });

	mongoose.connection.on('error', err => {
		console.error(err);
		console.warn('MongoDB connection error. Please make sure MongoDB is running correctly.');
		process.exit();
	});

	callback();
};
