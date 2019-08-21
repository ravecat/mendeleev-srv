import { Router } from 'express';

export default (function root() {
  const router = Router();

  router.get('/', (req, res) => {
    res.status(200).send({
      message: 'Mendeleev API',
      data: {
        version: 'v1',
      },
    });
  });

  return router;
})();
