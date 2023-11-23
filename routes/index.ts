import express from 'express';
import AuthenticationRouter from './authentication-router';
import ForumRouter from './forum-router';
function buildRouter(app: express.Express) {
    const router = express.Router();

    // Authentication router
    router.use('/auth', AuthenticationRouter);
    router.use('/forum', ForumRouter);

    // Root route
    app.use('/api', router);
}

export default buildRouter;
