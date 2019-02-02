import { Router } from 'express';
import mongoCallback from './mongoCallback';
import expressCallback from './expressCallback';

const mapList = { create:'post', read:'get' };
// TODO Use that for entity
// const mapEntity = { readEntity:'get', update:'put', delete:'delete' };

export default ({ mergeParams = false, caseSensitive = false, strict = false, id, model, ...rest }) => {
  const router = Router({
    mergeParams,
    caseSensitive,
    strict
  });

  if (rest.middleware) router.use(rest.middleware);

  router.use('/:id([a-zA-Z0-9]+)', function(req, res, next) {
    // TODO Add routes for entity
    next();
  });
  
  Object.keys(mapList).forEach(key => {
    const isCustomCb = typeof rest[key] === 'function';
    const callback = isCustomCb ? rest[key] : expressCallback[key];
    
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
