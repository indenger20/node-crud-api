/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { IncomingMessage } from 'http';
import ArgumentValidateError from '../errors/argument-validate.error';

class Request<T = unknown> extends IncomingMessage {
  private body?: T;

  private getUrlParts(): any[] {
    if (!this.url) {
      return [];
    }

    let urlString: string = this.url;

    if (urlString.endsWith('/')) {
      urlString = urlString.slice(0, urlString.length - 1);
    }

    if (urlString.startsWith('/')) {
      urlString = urlString.slice(1);
    }

    let urlParts: any[] = [];

    const requestParts = urlString.toLowerCase().split('/');

    if (requestParts.length > 1 && requestParts[0] === 'api') {
      urlParts = requestParts.splice(1);
    }

    return urlParts;
  }

  public setBody(body?: T) {
    this.body = body;
  }

  public getBody() {
    return this.body;
  }

  public getJsonBody() {
    try {
      if (this.body) {
        return JSON.parse(this.body as string) as T;
      }
    } catch (error) {}

    throw new ArgumentValidateError('Invalid JSON');
  }

  public getId(): string | undefined {
    const urlParts = this.getUrlParts();

    return urlParts[1];
  }
}

export default Request;
