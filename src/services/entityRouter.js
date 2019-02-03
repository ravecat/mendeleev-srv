import { Router } from 'express';
import mongoCallback from './mongoCallback';
import expressCallback from './expressCallback';

const mapEntity = { readEntity:'get', update:'put', delete:'delete' };

export default (model, ...rest) => {
  const router = Router({
    mergeParams: true,
  });

  Object.keys(mapEntity).forEach(key => {
    const callback = typeof rest[key] === 'function' ? rest[key] : expressCallback[key];
    
    router[mapEntity[key]]('/', (req, res, next) => {
      try {
        mongoCallback[key]({ req, res, next, callback, model, key });
      } catch(err) {
        next(err);
      }
    });
  });

  return router;
};
