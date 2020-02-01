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

  // Assume that it is past midday.
  // This is relevant when parsing civilian times such as '1:30'.
  // Without being explicit about the base time being after midday,
  // the above time would be interpreted either as '1:30' (military time)
  // or '13:30' depending on the time of the day when the data is parsed.
  const baseDate = parseDate('12:00', 'HH:mm', new Date());

  for (const format of formats) {
    const movingChunks = createMovingChunks(words, format.wordCount);

    let chunkIndex = 0;

    for (const movingChunk of movingChunks) {
      chunkIndex++;

      let subject = movingChunk.join(' ');

      if (format.normalizeInput) {
        subject = format.normalizeInput(subject);
      }

      const date = parseDate(subject, format.dateFnsFormat, baseDate);

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
