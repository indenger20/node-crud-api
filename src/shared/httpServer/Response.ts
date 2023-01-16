import { IncomingMessage, ServerResponse } from 'http';

class Response<Request extends IncomingMessage = IncomingMessage> extends ServerResponse<Request> {
  public json(data: object | string, statusCode: number): void {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);

    this.setHeader('Content-Length', Buffer.from(jsonString).length);
    this.setHeader('Content-Type', 'application/json');
    this.statusCode = statusCode;

    this.end(jsonString);
  }
}

export default Response;
