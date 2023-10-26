import express from 'express';
import ExampleRouter from './example-router';
function buildRouter(app: express.Express) {
    const router = express.Router();

    router.use('/example', ExampleRouter);

    // Root route
    app.use('/api', router);
}

export default buildRouter;
