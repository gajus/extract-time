// @flow

import cartesian from 'cartesian';
import calculateSpecificity from './calculateSpecificity';
import type {
  TimeNotationType,
} from './types';

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
        normalizeInput: (input) => {
          return input === '24:00' ? '00:00' : input;
        },
        timeNotation: 24,
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
        timeNotation: 12,
      };
    }),
];

const unsafeCivilianTimeFormats = [
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
  ])
    .map((combination) => {
      return {
        dateFnsFormat: combination.join(''),
        timeNotation: 12,
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
        timeNotation: 12,
      };
    }),
];

export default (timeNotation: TimeNotationType | null = null) => {
  let formats;

  if (timeNotation === 12) {
    formats = [
      ...civilianTimeFormats,
      ...unsafeCivilianTimeFormats,
    ];
  } else if (timeNotation === 24) {
    formats = [
      // HH.mm.ss is unsafe because it can be confused with date format (YY.MM.DD).
      {
        dateFnsFormat: 'HH:mm:ss',
        timeNotation: 24,
      },
      ...militaryTimeFormats,
    ];
  } else {
    formats = [
      // HH.mm.ss is unsafe because it can be confused with date format (YY.MM.DD).
      {
        dateFnsFormat: 'HH:mm:ss',
        timeNotation: 24,
      },
      ...militaryTimeFormats,
      ...civilianTimeFormats,
      ...civilianTimeFormatsWithoutMinutes,
    ];
  }

  return formats
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
