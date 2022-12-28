import { createServer } from 'http';
import Router from './router';
import BodyParser from './bodyParser';
import ActionResolver from './action.resolver';
import HttpStatusCodeResolver from './http-status-code.resolver';
import HttpStatusCodes from '../constants/httpStatusCodes';
import { Response } from './types';
import BodyResolver from './body.resolver';

class HttpServer {
  private server: ReturnType<typeof createServer>;

  constructor({ router }: { router: Router }) {
    this.server = createServer();

    this.server.on('request', async (request, response) => {
      try {
        await BodyParser.parse(request);

        const controller = await ActionResolver.resolve({ request, router });
        const { statusCode, actionResult } = await controller(request, response);

        this.prepareAndSendRequest({ response, statusCode, actionResult });
      } catch (error) {
        this.prepareAndSendRequest({ response, error });
      }
    });
  }

  private prepareAndSendRequest({
    response,
    statusCode,
    actionResult,
    error,
  }: {
    response: Response;
    statusCode?: HttpStatusCodes;
    actionResult?: unknown;
    error?: unknown;
  }) {
    const responseHttpStatusCode = HttpStatusCodeResolver.resolve({
      error,
      statusCode,
    });

    const responseBody = BodyResolver.resolve({
      actionResult,
      responseHttpStatusCode,
      error,
    });

    const bodySerialized = JSON.stringify(responseBody);

    response.setHeader('Content-Length', Buffer.from(bodySerialized).length);
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = responseHttpStatusCode;

    response.end(bodySerialized);
  }

  listen(port: number) {
    this.server.listen(port);
  }
}

export default HttpServer;
