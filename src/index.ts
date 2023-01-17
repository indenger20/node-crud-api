import * as dotenv from 'dotenv';

import { args } from './shared/utils/parseArgs';
import { createMultiServer, createServer } from './servers';
import ErrorHandler from './shared/errors/error-handler';

dotenv.config();

const isMulti = args.values.multi;

const { API_PORT = 3000 } = process.env;
const port = Number(API_PORT);

process.on('unhandledRejection', (reason) => {
  // The error will be handled by the 'uncaughtException' handler.
  throw reason;
});

process.on('uncaughtException', (error) => {
  ErrorHandler.handle(error);
});

if (isMulti) {
  createMultiServer(port);
} else {
  createServer(port);
}
