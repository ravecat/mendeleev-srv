import { Router } from 'express';
import entityRouter from './router/entityRouter';
import rangeRouter from './router/rangeRouter';

export default ({ mergeParams = false, caseSensitive = false, strict = false, model, ...rest }) => {
  const router = Router({
    mergeParams,
    caseSensitive,
    strict
  });

  if (rest.middleware) router.use(rest.middleware);

  router.use('/', rangeRouter(model, ...rest));
  router.use('/:id([a-zA-Z0-9]+)', entityRouter(model, ...rest));
  
  return router;
};
