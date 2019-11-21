// @flow

import cartesian from 'cartesian';
import calculateSpecificity from './calculateSpecificity';

const militaryTimeFormats = [
  ...cartesian([
    [
      'HH',
      'H',
    ],
    [
      ':',
      '.',
    ],
    [
      'mm',
      'm',
    ],
  ])
    .map((combination) => {
      return {
        dateFnsFormat: combination.join(''),
        timeFormat: 24,
      };
    }),
];

const civilianTimeFormats = [
  ...cartesian([
    [
      'hh',
      'h',
    ],
    [
      ':',
      '.',
    ],
    [
      'mm',
      'm',
    ],
    [
      '',
      ' ',
    ],
    [
      'a',
    ],
  ])
    .map((combination) => {
      return {
        dateFnsFormat: combination.join(''),
        timeFormat: 12,
      };
    }),
];

const civilianTimeFormatsWithoutMinutes = [
  ...cartesian([
    [
      'hh',
      'h',
    ],
    [
      'a',
    ],
  ])
    .map((combination) => {
      return {
        dateFnsFormat: combination.join(''),
        timeFormat: 12,
      };
    }),
];

export default () => {
  return [
    // HH.mm.ss is unsafe because it can be confused with date format.
    {
      dateFnsFormat: 'HH:mm:ss',
      timeFormat: 24,
    },
    ...militaryTimeFormats,
    ...civilianTimeFormats,
    ...civilianTimeFormatsWithoutMinutes,
  ]
    .map((format) => {
      return {
        specificity: calculateSpecificity(format.dateFnsFormat),
        wordCount: format.dateFnsFormat.replace(/[^ ]/g, '').length + 1,
        ...format,
      };
    })
    .sort((a, b) => {
      if (b.specificity === a.specificity) {
        return a.dateFnsFormat.localeCompare(b.dateFnsFormat);
      }

      return b.specificity - a.specificity;
    });
};
