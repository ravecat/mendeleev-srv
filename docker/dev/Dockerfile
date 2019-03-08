FROM mongo:latest
COPY elements.json /elements.json
CMD mongoimport --port ${DB_PORT} --db ${DB_NAME} --collection elements --drop --file /elements.json --jsonArray