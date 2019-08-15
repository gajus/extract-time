// @flow

import test from 'ava';
import extractTime from '../../../src/extractTime';

test('extracts time from YYYY-MM-DDTHH:mm:ss', (t) => {
  t.deepEqual(extractTime('2019-02-12T14:00:00'), [
    {
      time: '14:00',
    },
  ]);
});

test('extracts time from HH:mm:ss+Z', (t) => {
  t.deepEqual(extractTime('14:00:00+00:00'), [
    {
      time: '14:00',
    },
  ]);
});

test('extracts time from HH:mm:ssZ', (t) => {
  t.deepEqual(extractTime('14:00:00Z'), [
    {
      time: '14:00',
    },
  ]);
});

test('does not extract time from a concatenation of time-like fragments longer than 3', (t) => {
  t.deepEqual(extractTime('14:00:00:00'), []);
});
