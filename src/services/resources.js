import { Router } from 'express';
import listCallback from './listCallback'

const mapList = { create:'post', read:'get' };
const mapEntity = { readEntity:'get', update:'put', delete:'delete' };
const mapMongo = { create:'save', read:'find', update:'findByIdAndUpdate', delete:'findByIdAndRemove' };

export default ({ mergeParams = false, caseSensitive = false, strict = false, id, model, ...rest }) => {
  const router = Router({
    mergeParams,
    caseSensitive,
    strict
  })

  if (rest.middleware) router.use(rest.middleware);

  router.use('/:id([a-zA-Z0-9]+)', function(req, res, next) {
    next();
  });

  for (let key in rest) {
    if (typeof rest[key] === 'function') {
      router[mapList[key]]('/', (req, res, next) => {
        try {
          model[mapMongo[key]]((err, data) => {
            if (err) return res.status(500).send(err)
            
            res.data = data

            rest[key](req, res, next)
          })
        } catch(err) {
          next(err)
        }
      });
    }
  }

  return router
}