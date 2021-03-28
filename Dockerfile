FROM node:15.8-alpine3.13 as builder

WORKDIR /app
COPY . .
RUN yarn install && \
    ./node_modules/.bin/babel src -s -D -d dist

FROM node:15.8-alpine3.13

WORKDIR /app
COPY package.json ./
RUN yarn install --production && \
    yarn cache clean
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist"]
