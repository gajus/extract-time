// @flow

import {
  format as formatDate,
  isValid as isDateValid,
  parse as parseDate,
} from 'date-fns';
import createMovingChunks from './createMovingChunks';
import normalizeInput from './normalizeInput';
import createFormats from './createFormats';
import Logger from './Logger';
import type {
  TimeMatchType,
  TimeNotationType,
} from './types';

const log = Logger.child({
  namespace: 'extractTime',
});

export default (input: string, timeNotation: TimeNotationType | null = null): $ReadOnlyArray<TimeMatchType> => {
  const formats = createFormats(timeNotation);

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

      const date = parseDate(subject, format.dateFnsFormat, new Date());

      if (!isDateValid(date)) {
        continue;
      }

      log.debug('matched "%s" using "%s" date-fns format', subject, format.dateFnsFormat);

      words = words.slice(chunkIndex);

      matches.push({
        time: formatDate(date, 'HH:mm'),
      });
    }
  }

  return matches;
};
