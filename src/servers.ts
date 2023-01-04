import { cpus } from 'node:os';
import cluster from 'node:cluster';
import http from 'node:http';

import HttpServer from './shared/httpServer';
import Router from './shared/httpServer/router';
import userRoutes from './components/users/user.routes';

const numCPUs = cpus().length;
let requests = 0;

const resolveServerPort = (port: number) => {
  requests = requests === numCPUs ? 1 : requests + 1;
  const nextPort = port + requests;
  return nextPort;
};

const createLoadBalancerServer = (port: number) => {
  http
    .createServer((balancerRequest, balancerResponse) => {
      const serverPort = resolveServerPort(port);

      balancerRequest.pipe(
        http.request(
          {
            path: balancerRequest.url,
            method: balancerRequest.method,
            port: serverPort,
          },
          (response) => {
            response.pipe(balancerResponse);
          },
        ),
      );
    })
    .listen(port);
};

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

    createLoadBalancerServer(port);
  } else {
    const clusterPort = port + (cluster.worker?.id ?? 0);

    createServer(clusterPort);
  }
};

export { createServer, createMultiServer };
