// @flow

import test, {
  afterEach,
  beforeEach
} from 'ava';
import sinon from 'sinon';
import moment from 'moment';
import extractTime from '../../../src/extractTime';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('extracts multiple times', (t) => {
  clock.tick(moment('2000-06-01 16:00').valueOf());

  const actual = extractTime(moment().format('HH:mm') + ' ' + moment().add(1, 'hour').format('HH:mm'), 24);
  const expected = [
    {
      time: moment().format('HH:mm')
    },
    {
      time: moment().add(1, 'hour').format('HH:mm')
    }
  ];

  t.deepEqual(actual, expected);
});
