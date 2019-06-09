const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'dev';

const dotenvFiles = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  '.env',
];

if (!dotenvFiles.some(fs.existsSync)) {
	console.warn('\nAny environment variables files don\'t exist, app uses manually setted parameters or default configuration\n');
}

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

export default {
	mode: NODE_ENV,
	port: process.env.PORT || 3000,
	databaseName: process.env.DB_NAME || 'mendeleev',
	databaseHost: process.env.DB_HOST || 'localhost',
	databasePort: process.env.DB_PORT || 27017,
	errorStatus: process.env.ERROR_STATUS || 500,
	bodyLimit: process.env.BODY_LIMIT || 100,
	corsHeaders: ['Link']
};
