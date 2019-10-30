// @flow

import test, {
  afterEach,
  beforeEach,
} from 'ava';
import sinon from 'sinon';
import {
  addHours,
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import extractTime from '../../../src/extractTime';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('extracts multiple times (1 word format)', (t) => {
  clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

  const actual = extractTime(formatDate(new Date(), 'HH:mm') + ' ' + formatDate(addHours(new Date(), 1), 'HH:mm'));
  const expected = [
    {
      time: formatDate(new Date(), 'HH:mm'),
    },
    {
      time: formatDate(addHours(new Date(), 1), 'HH:mm'),
    },
  ];

  t.deepEqual(actual, expected);
});

test('extracts multiple times (2 words format)', (t) => {
  clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

  const actual = extractTime(formatDate(new Date(), 'hh:mm a') + ' ' + formatDate(addHours(new Date(), 1), 'hh:mm a'));
  const expected = [
    {
      time: formatDate(new Date(), 'HH:mm'),
    },
    {
      time: formatDate(addHours(new Date(), 1), 'HH:mm'),
    },
  ];

  t.deepEqual(actual, expected);
});

test('extracts multiple times (2 words format) + noise', (t) => {
  clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

  const actual = extractTime('foo bar ' + formatDate(new Date(), 'hh:mm a') + ' baz ' + formatDate(addHours(new Date(), 1), 'hh:mm a'));
  const expected = [
    {
      time: formatDate(new Date(), 'HH:mm'),
    },
    {
      time: formatDate(addHours(new Date(), 1), 'HH:mm'),
    },
  ];

  t.deepEqual(actual, expected);
});
