import { mongoMiddleware } from 'mongo-express-middleware';

export default model =>
  mongoMiddleware({
    model,
  });
