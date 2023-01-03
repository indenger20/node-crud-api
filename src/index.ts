import * as dotenv from 'dotenv';

import { args } from './shared/utils/parseArgs';
import { createMultiServer, createServer } from './servers';

dotenv.config();

const isMulti = args.values.multi;

const { API_PORT = 3000 } = process.env;
const port = Number(API_PORT);

if (isMulti) {
  createMultiServer(port);
} else {
  createServer(port);
}
