import { mongoMiddleware } from '../services/mongo-express-middleware';

export default Elements => mongoMiddleware({
  model: Elements
});
