import { Router } from 'express';
import mongoMethod from '../mongoMethod';
import defaultCallback from './defaultCallback';

const mapEntity = { readEntity:'get', update:'put', delete:'delete' };

export default (model, ...rest) => {
  const router = Router({
    mergeParams: true,
  });

  Object.keys(mapEntity).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : defaultCallback;   
    
    router[mapEntity[key]]('/', (req, res, next) => {
      try {
        mongoMethod[key]({ req, res, next, callback, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
