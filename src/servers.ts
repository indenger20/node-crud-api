import { cpus } from 'node:os';
import cluster from 'node:cluster';

import HttpServer from './shared/httpServer';
import Router from './shared/httpServer/router';
import userRoutes from './components/users/user.routes';

const numCPUs = cpus().length;

const createServer = (port: number) => {
  const router = new Router();
  router.setApiPath('/api');

  userRoutes(router);

  const server = new HttpServer({ router });

  server.listen(port);
};

const createMultiServer = (port: number) => {
  if (cluster.isPrimary) {
    for (let cpuIndex = 0; cpuIndex < numCPUs; cpuIndex += 1) {
      cluster.fork();
    }

    cluster.on('exit', () => {
      cluster.fork();
    });
    createServer(port);
  } else {
    const clusterPort = port + (cluster.worker?.id ?? 0);
    createServer(clusterPort);
  }
};

export { createServer, createMultiServer };
