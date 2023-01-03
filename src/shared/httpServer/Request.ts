import { IncomingMessage } from 'http';

class Request extends IncomingMessage {
  private body?: string;

  public setBody(body?: string) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }
}

export default Request;
