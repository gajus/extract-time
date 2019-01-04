// @flow

/* eslint-disable no-continue */

import moment from 'moment';
import createMovingChunks from './createMovingChunks';
import splitToWords from './splitToWords';
import createFormats from './createFormats';
import Logger from './Logger';

/**
 * @property time 24-hour military time.
 */
type TimeMatchType = {|
  +time: string
|};

type TimeFormatType = 12 | 24;

const log = Logger.child({
  namespace: 'extractTime'
});

export default (subject: string, timeFormat: TimeFormatType): $ReadOnlyArray<TimeMatchType> => {
  if (timeFormat !== 12 && timeFormat !== 24) {
    throw new Error('Unexpected time format value. Must be 12 or 24.');
  }

  log.debug('attempting to extract date from "%s" input using %d time format', subject, timeFormat);

  const formats = createFormats();

  let words = splitToWords(subject);

  const matches = [];

  for (const format of formats) {
    const movingChunks = createMovingChunks(words, format.wordCount);

    let chunkIndex = 0;

    for (const movingChunk of movingChunks) {
      chunkIndex++;

      const input = movingChunk.join(' ');

      log.trace('testing "%s" input using "%s" moment format', input, format.momentFormat);

      const date = moment(input, format.momentFormat, true);

      if (!date.isValid()) {
        continue;
      }

      if (format.timeFormat && format.timeFormat !== timeFormat) {
        continue;
      }

      if (format.timeFormat && !timeFormat) {
        log.info('found a match using "%s" moment format; unsafe to use without `timeFormat` configuration', format.momentFormat);

        continue;
      }

      words = words.slice(chunkIndex);

      matches.push({
        time: date.format('HH:mm')
      });
    }
  }

  return matches;
};
