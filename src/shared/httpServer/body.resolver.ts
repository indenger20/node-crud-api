import HttpStatusCodes from '../constants/httpStatusCodes';

type ErrorMessage = {
  message: string;
};

interface ErrorBody {
  errors: ErrorMessage[];
}

class BodyResolver {
  static resolve({
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

    const errorBody: ErrorBody = {
      errors: [],
    };

    if (responseHttpStatusCode === HttpStatusCodes.INTERNAL_SERVER_ERROR) {
      const errorResult = {
        message: 'Internal Server Error',
      };

      errorBody.errors.push(errorResult);

      return errorBody;
    }

    if (responseHttpStatusCode === HttpStatusCodes.NOT_FOUND) {
      const errorResult = {
        message: 'NOT FOUND',
      };

      errorBody.errors.push(errorResult);

      return errorBody;
    }

    return errorBody;
  }
}

export default BodyResolver;
