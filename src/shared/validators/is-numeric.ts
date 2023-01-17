/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArgumentValidateError from '../errors/argument-validate.error';

function assertIsNumeric(value: any, message: string) {
  if (value === null || value === undefined || !Number.parseInt(value)) {
    throw new ArgumentValidateError(message);
  }
}

export default assertIsNumeric;
