import { Router } from 'express';
import mongoMethod from '../mongoMethod';
import defaultCallback from './defaultCallback';

const mapList = { create:'post', read:'get' };

export default (model, ...rest) => {
  const router = Router({
    mergeParams: true,
  });

  Object.keys(mapList).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : defaultCallback;
    
    router[mapList[key]]('/', (req, res, next) => {
      try {
        mongoMethod[key]({ req, res, next, callback, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
