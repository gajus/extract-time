// @flow

/* eslint-disable no-continue */

import moment from 'moment';
import createMovingChunks from './createMovingChunks';
import normalizeInput from './normalizeInput';
import createFormats from './createFormats';
import Logger from './Logger';
import type {
  TimeMatchType,
} from './types';

const log = Logger.child({
  namespace: 'extractTime',
});

const formats = createFormats();

export default (input: string): $ReadOnlyArray<TimeMatchType> => {
  log.debug('attempting to extract date from "%s" input', input);

  const normalizedInput = normalizeInput(input);

  log.debug('normalized input to "%s"', normalizedInput);

  let words = normalizedInput.split(' ');

  const matches = [];

  for (const format of formats) {
    const movingChunks = createMovingChunks(words, format.wordCount);

    let chunkIndex = 0;

    for (const movingChunk of movingChunks) {
      chunkIndex++;

      const subject = movingChunk.join(' ');

      const date = moment(subject, format.momentFormat, true);

      if (!date.isValid()) {
        continue;
      }

      log.debug('matched "%s" using "%s" moment format', subject, format.momentFormat);

      words = words.slice(chunkIndex);

      matches.push({
        time: date.format('HH:mm'),
      });
    }
  }

  return matches;
};
