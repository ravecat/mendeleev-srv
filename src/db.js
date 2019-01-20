import mongoose from 'mongoose';

export default callback => {
  const { DB_HOST, DB_NAME } = process.env;

	mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true });

	callback();
};
