import express from 'express';
import AuthenticationRouter from './authentication-router';
import ExampleRouter from './example-router';
function buildRouter(app: express.Express) {
    const router = express.Router();

    // Authentication router
    router.use('/auth', AuthenticationRouter);

    // Root route
    app.use('/api', router);
}

export default buildRouter;
