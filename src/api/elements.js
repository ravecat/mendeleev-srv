import mongoMiddleware from '../services/mongo_express_middleware';

export default Elements => mongoMiddleware({
  model: Elements
});
