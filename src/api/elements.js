import { mongoMiddleware } from 'mongo-express-middleware';
import { Router } from 'express';
import { Elements } from '../models';

export default (function elements() {
  const router = Router();

  router.get('/:atomicNumber([0-9]+)', function(req, res, next) {
    req.query = { atomicNumber: Number(req.params.atomicNumber) };
    req.url = '/';
    next();
  });
  router.use(
    '/',
    mongoMiddleware({
      model: Elements,
    }),
  );

  return router;
})();
