import HttpStatusCodes from '../constants/httpStatusCodes';
import { RouteResolveErrorBase } from '../errors/router';

class HttpStatusCodeResolver {
  static resolve({ error, statusCode }: { error: unknown; statusCode?: HttpStatusCodes }): HttpStatusCodes {
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
}

export default HttpStatusCodeResolver;
