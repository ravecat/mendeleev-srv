import { Router } from 'express';
import elements from './elements';
import models from '../models'

export default ({ config }) => {
	const router = Router();

	router.use('/elements', elements(models, { config }));
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
