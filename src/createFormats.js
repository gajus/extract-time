// @flow

import cartesian from 'cartesian';
import calculateSpecificity from './calculateSpecificity';

const militaryTimeFormats = [
  ...cartesian([
    [
      'HH',
      'H'
    ],
    [
      ':',
      '.'
    ],
    [
      'mm',
      'm'
    ]
  ])
    .map((combination) => {
      return {
        momentFormat: combination.join(''),
        timeFormat: 24
      };
    })
];

const civilianTimeFormats = [
  ...cartesian([
    [
      'hh',
      'h'
    ],
    [
      ':',
      '.'
    ],
    [
      'mm',
      'm'
    ],
    ' ',
    [
      'A',
      'a'
    ]
  ])
    .map((combination) => {
      return {
        momentFormat: combination.join(''),
        timeFormat: 12
      };
    })
];

export default () => {
  return [
    ...militaryTimeFormats,
    ...civilianTimeFormats
  ]
    .map((format) => {
      return {
        specificity: calculateSpecificity(format.momentFormat),
        wordCount: format.momentFormat.replace(/[^ ]/g, '').length + 1,
        ...format
      };
    })
    .sort((a, b) => {
      if (b.specificity === a.specificity) {
        return a.momentFormat.localeCompare(b.momentFormat);
      }

      return b.specificity - a.specificity;
    });
};
