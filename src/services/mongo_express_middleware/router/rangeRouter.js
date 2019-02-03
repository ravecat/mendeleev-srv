import { Router } from 'express';
import mongoMethod from '../mongoMethod';
import expressCallback from '../expressCallback';

const mapList = { create:'post', read:'get' };

export default (model, ...rest) => {
  const router = Router({
    mergeParams: true,
  });

  Object.keys(mapList).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : expressCallback[key];
    
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
