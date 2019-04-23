FROM mongo:latest
COPY elements.json /elements.json
CMD mongoimport --host mongo --db mendeleev --collection elements --drop --file /elements.json --jsonArray