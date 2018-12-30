// @flow

import test from 'ava';
import extractTime from '../../src/extractTime';

test('throws an error if invalid format is provided', (t) => {
  t.throws(() => {
    // $FlowFixMe
    extractTime('', '12');
  }, 'Unexpected time format value. Must be 12 or 24.');
});
