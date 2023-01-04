import { IncomingMessage } from 'http';

class Request<T = unknown> extends IncomingMessage {
  private body?: T;

  public setBody(body?: T) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }
}

export default Request;
