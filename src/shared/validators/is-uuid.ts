/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate as validateUuid } from 'uuid';
import ArgumentValidateError from '../errors/argument-validate.error';

function assertIsValidUuid(value: any) {
  if (!validateUuid(value)) {
    throw new ArgumentValidateError('Invalid UUID.');
  }
}

export default assertIsValidUuid;
