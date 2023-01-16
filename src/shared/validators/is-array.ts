/* eslint-disable @typescript-eslint/no-explicit-any */
import ArgumentValidateError from '../errors/argument-validate.error';

function assertIsArray(value: any, message: string) {
  if (value === null || value === undefined || !Array.isArray(value)) {
    throw new ArgumentValidateError(message);
  }
}

export default assertIsArray;
