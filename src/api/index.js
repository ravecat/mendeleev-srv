import { Router } from 'express';
import elements from './elements';
import models from '../models'

export default () => {
	const router = Router();

	router.use('/elements', elements(models));
	router.get('/', (req, res) => {
		res.send({
			message: 'Mendeleev API',
			data: {
				version: 'v1'
			}
		});
	});

	return router;
}
