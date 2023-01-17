import { ApplicationError } from './application.error';

class HttpNotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'HttpNotFoundError';
  }
}

export default HttpNotFoundError;
