import express from 'express';
import buildRouter from './routes';
import cors from 'cors';
import corsOpts from './config/cors-config';
import Variables from './config/variables';

const app: express.Express = express();
const port = Variables.port;

// CORS middleware
app.use(cors(corsOpts));

// Parses incoming JSON requests and
// puts the parsed data in req.body
app.use(express.json());

// Create routes
buildRouter(app);

// Start listening for requests
console.log('Listening on port ' + port + '...');
app.listen(port);
