FROM node:10.13-alpine
WORKDIR /app
COPY . /app

RUN yarn && ./node_modules/.bin/babel src -s -D -d dist

EXPOSE 3000
CMD ["node", "dist"]
