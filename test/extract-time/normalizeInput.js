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
  t.true(normalizeInput('14:00:00') === '14:00');
  t.true(normalizeInput('14:00:00 15:00:00') === '14:00 15:00');
});

test('does not extract time from a concatenation of time-like fragments longer than 3', (t) => {
  t.true(normalizeInput('14:00:00:00') === '14:00:00:00');
});

// https://en.wikipedia.org/wiki/Date_and_time_notation_in_France
test('replaces H/h between two time-like fragments with a colon', (t) => {
  t.true(normalizeInput('14h10') === '14:10');
  t.true(normalizeInput('14H10') === '14:10');
});

// https://en.wikipedia.org/wiki/Date_and_time_notation_in_France
test('pulls together two time-like fragments separated with H/h', (t) => {
  t.true(normalizeInput('14 h 10') === '14:10');
  t.true(normalizeInput('14 H 10') === '14:10');
});
