import express from 'express';

function buildRouter(app: express.Express) {
  const router = express.Router();

  // Quantiy catalogue route
  router.get('/', (req, res) => {
    res.json('hello world');
  });

  // Root route
  app.use('/api', router);
}

export default buildRouter;
