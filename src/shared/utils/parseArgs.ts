import { parseArgs } from 'node:util';

export const args = parseArgs({
  options: {
    multi: {
      type: 'boolean',
      short: 'm',
    },
  },
});
