import { ApplicationError } from './application.error';

class ArgumentValidateError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentValidateError';
  }
}

export default ArgumentValidateError;
