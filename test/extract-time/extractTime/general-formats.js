// @flow

import test, {
  afterEach,
  beforeEach,
} from 'ava';
import sinon from 'sinon';
import moment from 'moment';
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
    clock.tick(moment('2000-06-01 16:00').valueOf());

    const currentDate = moment();

    return {
      date: currentDate.format('HH:mm'),
      input: currentDate.format(format.momentFormat),
      momentFormat: format.momentFormat,
      timeFormat: format.timeFormat,
    };
  });

for (const subject of subjects) {
  // eslint-disable-next-line no-loop-func
  test('extracts ' + subject.momentFormat + ' from "' + subject.momentFormat + '" input using ' + subject.timeFormat + ' time format', (t) => {
    clock.tick(moment('2000-06-01 16:00').valueOf());

    const actual = extractTime(subject.input);
    const expected = subject.date;

    t.true(actual.length === 1);
    t.true(actual[0].time === expected);
  });

  // eslint-disable-next-line no-loop-func
  test('extracts ' + subject.momentFormat + ' from "%w' + subject.momentFormat + '%w" input using ' + subject.timeFormat + ' time format', (t) => {
    clock.tick(moment('2000-06-01 16:00').valueOf());

    const actual = extractTime('foo ' + subject.input + ' bar');
    const expected = subject.date;

    t.true(actual.length === 1);
    t.true(actual[0].time === expected);
  });
}
