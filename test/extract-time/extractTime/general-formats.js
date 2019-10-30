// @flow

import test, {
  afterEach,
  beforeEach,
} from 'ava';
import sinon from 'sinon';
import {
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import extractTime from '../../../src/extractTime';
import createFormats from '../../../src/createFormats';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

const formats = createFormats();

const subjects = formats
  .filter((format) => {
    return format.test !== false;
  })
  .map((format) => {
    clock = sinon.useFakeTimers();
    clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

    const currentDate = new Date();

    return {
      date: formatDate(currentDate, 'HH:mm'),
      dateFnsFormat: format.dateFnsFormat,
      input: formatDate(currentDate, format.dateFnsFormat),
      timeFormat: format.timeFormat,
    };
  });

for (const subject of subjects) {
  // eslint-disable-next-line no-loop-func
  test('extracts ' + subject.dateFnsFormat + ' from "' + subject.dateFnsFormat + '" input using ' + subject.timeFormat + ' time format', (t) => {
    clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

    const actual = extractTime(subject.input);
    const expected = subject.date;

    t.true(actual.length === 1);
    t.true(actual[0].time === expected);
  });

  // eslint-disable-next-line no-loop-func
  test('extracts ' + subject.dateFnsFormat + ' from "%w' + subject.dateFnsFormat + '%w" input using ' + subject.timeFormat + ' time format', (t) => {
    clock.tick(parseDate('2000-06-01 16:00', 'yyyy-MM-dd HH:mm', new Date()).getTime());

    const actual = extractTime('foo ' + subject.input + ' bar');
    const expected = subject.date;

    t.true(actual.length === 1);
    t.true(actual[0].time === expected);
  });
}
