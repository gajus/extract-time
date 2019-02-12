// @flow

import test from 'ava';
import normalizeInput from '../../src/normalizeInput';

test('removes UTC offset', (t) => {
  t.true(normalizeInput('14:00:00+00:00 15:00:00+00:00') === '14:00 15:00');
});

test('removes date from YYYY-MM-DDTHH:mm', (t) => {
  t.true(normalizeInput('2018-01-01T14:00 2018-01-01T15:00') === '14:00 15:00');
});

test('removes seconds', (t) => {
  t.true(normalizeInput('14:00:00 15:00:00') === '14:00 15:00');
});
