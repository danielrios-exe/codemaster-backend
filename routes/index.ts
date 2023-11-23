import express from 'express';
import AuthenticationRouter from './authentication-router';
import ExampleRouter from './example-router';
import runCode from './run-code';
function buildRouter(app: express.Express) {
    const router = express.Router();

    // Authentication router
    router.use('/auth', AuthenticationRouter);

    router.use('/run-code', runCode);

    // Root route
    app.use('/api', router);
}

export default buildRouter;
