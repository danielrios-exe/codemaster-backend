import express from 'express';
import ExampleRouter from './example-router';
import runCode from './run-code';
function buildRouter(app: express.Express) {
    const router = express.Router();

    router.use('/example', ExampleRouter);

    router.use('/run-code', runCode);

    // Root route
    app.use('/api', router);
}

export default buildRouter;
