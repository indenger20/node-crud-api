import { createServer } from 'http';
import Router from './router';
import ActionResolver from './action.resolver';
import HttpStatusCodes from '../constants/httpStatusCodes';
import { RouteResolveErrorBase } from '../errors/router/index';
import Request from './Request';
import Response from './Response';
import HttpNotFoundError from '../errors/http-not-found.error';

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

  private resolveStatusCode({ error, statusCode }: { error: unknown; statusCode?: number }): number {
    if (statusCode) {
      return statusCode;
    }

    if (error) {
      if (error instanceof RouteResolveErrorBase) {
        return HttpStatusCodes.HTTP_STATUS_NOT_FOUND;
      }

      if (error instanceof HttpNotFoundError) {
        return HttpStatusCodes.HTTP_STATUS_NOT_FOUND;
      }

      return HttpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }

    return HttpStatusCodes.HTTP_STATUS_OK;
  }

  private resolveBodyResponse({
    responseHttpStatusCode,
    actionResult,
    error,
  }: {
    responseHttpStatusCode: number;
    actionResult: unknown;
    error: unknown;
  }) {
    if (actionResult) {
      return actionResult;
    }

    if (!error) {
      return {};
    }

    if (responseHttpStatusCode === HttpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR) {
      return {
        message: 'Internal Server Error',
      };
    }

    if (responseHttpStatusCode === HttpStatusCodes.HTTP_STATUS_NOT_FOUND) {
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
    statusCode?: number;
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
