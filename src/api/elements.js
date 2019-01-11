import { Router } from 'express';
import models from '../models';

export default ({ Elements }, { config }) => {
	const router = Router();

	router.get('/', (req, res, next) => {
    try {
      Elements.find(function (err, data) {
        res.send(data);
      })
    } catch(err) {
      next(err)
    }
	});

	return router;
}