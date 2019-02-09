import { mongoMiddleware } from 'mongo-express-middleware';

export default Elements => mongoMiddleware({
  model: Elements
});
