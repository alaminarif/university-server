import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';
import { errorLogger, logger } from './share/logger';

// Handle uncaught Exception
process.on('uncaughtException', error => {
  errorLogger.error(`uncaught Exception is detected: ${error}`);
  process.exit(1);
});

let server: Server;

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    // eslint-disable-next-line no-console
    logger.info(`🛢   Database is connected successfully`);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    errorLogger.error('failed to database: ', error);
  }

  // Handle Unhandle Rejection
  process.on('unhandledRejection', error => {
    errorLogger.error(
      `Unhanlde Rejection is detected, we are closing server .......`
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
//
bootstrap();
// tjLbmgxDDsIQGB4P;
// Hnadle SIGTERM

process.on('SIGTERM', () => {
  logger.info('SIGTERM is receive');
  if (server) {
    server.close();
  }
});
