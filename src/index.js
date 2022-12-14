import express from 'express';

var pkg = require('../package.json');
import { config } from '../config/index';
import { client } from './data-access';
import morgan from './utils/middlewares/morgan.middleware';
import logger from './utils/logger';
import getRoutes from './routes';

// initialization
const app = express();

// middlewares
app.use(morgan);
app.use(express.json());

// routes
app.use(`/api/v${config.apiVersion}`, getRoutes());

function startServer() {
  app.listen(config.port, () => {
    logger.info(`Running in: ${config.dev ? 'development' : 'production'}`);
    logger.info('Server Time: ' + new Date());
    logger.info('v' + pkg.version + ' Copyright (C) Timco 2022\n');
    logger.info(`Server running on http://localhost:${config.port}`);
  });
}

client.sync().then(startServer());
