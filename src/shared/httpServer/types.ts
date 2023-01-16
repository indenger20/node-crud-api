import { Methods } from './constants';
import Request from './Request';
import Response from './Response';

export type RequestResult = { statusCode: number; actionResult: unknown };

export interface Route {
  method: Methods;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller: (request: Request<any>, response: Response) => Promise<RequestResult>;
}
