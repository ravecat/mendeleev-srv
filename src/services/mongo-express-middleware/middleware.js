import { Router } from 'express';
import mongoMethod from './mongoMethod';
import defaultCallback from './defaultCallback';

export default (model, map, ...rest) => {
  const router = Router({
    mergeParams: true,
  });
  
  Object.keys(map).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : defaultCallback;
    
    router[map[key]]('/', (req, res, next) => {
      try {
        mongoMethod[key]({ req, res, next, callback, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
