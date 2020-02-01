// @flow

import sinon from 'sinon';
import {
  parse as parseDate,
} from 'date-fns';
import test, {
  afterEach,
  beforeEach,
} from 'ava';
import extractTime from '../../../src/extractTime';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('extracts time from yyyy-MM-ddTHH:mm:ss', (t) => {
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

test('resolves times using specific time notation (12) (current time is before midday)', (t) => {
  clock.tick(parseDate('2000-06-01 08:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

  t.deepEqual(extractTime('1:30', 12), [
    {
      time: '13:30',
    },
  ]);
});

test('resolves times using specific time notation (12) (current time is after midday)', (t) => {
  clock.tick(parseDate('2000-06-01 20:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

  t.deepEqual(extractTime('1:30', 12), [
    {
      time: '13:30',
    },
  ]);
});

test('resolves times using specific time notation (24)', (t) => {
  t.deepEqual(extractTime('1:30', 24), [
    {
      time: '01:30',
    },
  ]);
});

// @see https://stackoverflow.com/a/13060823/368691
test('interprets 24:00 as 00:00', (t) => {
  t.deepEqual(extractTime('24:00'), [
    {
      time: '00:00',
    },
  ]);
});
