import * as dotenv from 'dotenv';
import path from 'path';
import { cpus } from 'node:os';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

dotenv.config();

const { API_PORT = 3000 } = process.env;

const numCPUs = cpus().length;

for (let i = 0; i <= numCPUs; i += 1) {
  console.log('i', i);

  const worker = new Worker(path.resolve(__dirname, './worker.ts'));
}
