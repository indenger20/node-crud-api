import { createServer } from 'http';
import Router from './router';
import ActionResolver from './action.resolver';
import HttpStatusCodes from '../constants/httpStatusCodes';
import { RouteResolveErrorBase } from '../errors/router/index';
import Request from './Request';
import Response from './Response';

class HttpServer {
  private server: ReturnType<typeof createServer>;

  constructor({ router }: { router: Router }) {
    this.server = createServer(
      {
        IncomingMessage: Request,
        ServerResponse: Response,
      },
      async (request, response) => {
        try {
          const body = await this.resolveBodyRequest(request);

          request.setBody(body);

          const controller = await ActionResolver.resolve({ request, router });
          const { statusCode, actionResult } = await controller(request, response);

          this.prepareAndSendRequest({ response, statusCode, actionResult });
        } catch (error) {
          this.prepareAndSendRequest({ response, error });
        }
      },
    );
  }

  private async resolveBodyRequest(request: Request) {
    const bodyChunks: Uint8Array[] = [];

    for await (const chunk of request) {
      bodyChunks.push(chunk);
    }

    return Buffer.concat(bodyChunks).toString();
  }

  private resolveStatusCode({ error, statusCode }: { error: unknown; statusCode?: HttpStatusCodes }): HttpStatusCodes {
    if (statusCode) {
      return statusCode;
    }

    if (error) {
      if (error instanceof RouteResolveErrorBase) {
        return HttpStatusCodes.NOT_FOUND;
      }

      // if (error instanceof NotFoundError.constructor) {
      //   return HttpStatusCodes.NOT_FOUND;
      // }

      return HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }

    return HttpStatusCodes.OK;
  }

  private resolveBodyResponse({
    responseHttpStatusCode,
    actionResult,
    error,
  }: {
    responseHttpStatusCode: HttpStatusCodes;
    actionResult: unknown;
    error: unknown;
  }) {
    if (actionResult) {
      return actionResult;
    }

    if (!error) {
      return {};
    }

    if (responseHttpStatusCode === HttpStatusCodes.INTERNAL_SERVER_ERROR) {
      return {
        message: 'Internal Server Error',
      };
    }

    if (responseHttpStatusCode === HttpStatusCodes.NOT_FOUND) {
      return {
        message: 'NOT FOUND',
      };
    }

    return {
      message: 'Internal Server Error',
    };
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
    const responseHttpStatusCode = this.resolveStatusCode({
      error,
      statusCode,
    });

    const responseBody = this.resolveBodyResponse({
      actionResult,
      responseHttpStatusCode,
      error,
    });

    response.json(responseBody, responseHttpStatusCode);
  }

  listen(port: number) {
    this.server.listen(port);
  }
}

export default HttpServer;
