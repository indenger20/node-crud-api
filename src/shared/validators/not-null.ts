import ArgumentValidateError from '../errors/argument-validate.error';

function assertNotNull<TValue>(value: TValue, message: string) {
  if (value === null || value === undefined) {
    throw new ArgumentValidateError(message);
  }
}

export default assertNotNull;
