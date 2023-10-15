import express from 'express';
import buildRouter from './routes';

const app: express.Express = express();
const port = 3000;

// Create routes
buildRouter(app);

// Start listening for requests
app.listen(port);
