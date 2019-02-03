import { Router } from 'express';
import mongoCallback from './mongoCallback';
import expressCallback from './expressCallback';
import entityRouter from './entityRouter';

const mapList = { create:'post', read:'get' };

export default ({ mergeParams = false, caseSensitive = false, strict = false, model, ...rest }) => {
  const router = Router({
    mergeParams,
    caseSensitive,
    strict
  });

  if (rest.middleware) router.use(rest.middleware);

  router.use('/:id([a-zA-Z0-9]+)', entityRouter(model, ...rest));
  
  Object.keys(mapList).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : expressCallback[key];
    
    router[mapList[key]]('/', (req, res, next) => {
      try {
        mongoCallback[key]({ req, res, next, callback, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
