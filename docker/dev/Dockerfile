FROM mongo
COPY elements.json /elements.json
# TODO Use temporary elements.json for mock data
CMD mongoimport --db mendeleev --collection elements --drop --file /elements.json --jsonArray