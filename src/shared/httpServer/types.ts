import { IncomingMessage, ServerResponse } from 'http';
import HttpStatusCodes from '../constants/httpStatusCodes';
import { Methods } from './constants';

export type Request = IncomingMessage;
export type Response = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};

export interface Route {
  method: Methods;
  path: string;
  controller: (request: Request, response: Response) => Promise<{ statusCode: HttpStatusCodes; actionResult: unknown }>;
}
