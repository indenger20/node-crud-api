import HttpStatusCodes from '../constants/httpStatusCodes';
import { Methods } from './constants';
import Request from './Request';
import Response from './Response';

export type RequestResult = { statusCode: HttpStatusCodes; actionResult: unknown };

export interface Route {
  method: Methods;
  path: string;
  controller: (request: Request, response: Response) => Promise<RequestResult>;
}
