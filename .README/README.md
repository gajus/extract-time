# extract-time ⏰

[![Travis build status](http://img.shields.io/travis/gajus/extract-time/master.svg?style=flat-square)](https://travis-ci.org/gajus/extract-time)
[![Coveralls](https://img.shields.io/coveralls/gajus/extract-time.svg?style=flat-square)](https://coveralls.io/github/gajus/extract-time)
[![NPM version](http://img.shields.io/npm/v/extract-time.svg?style=flat-square)](https://www.npmjs.org/package/extract-time)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Extracts time from an arbitrary text input.

{"gitdown": "contents"}

## Features

* Deterministic and unambiguous time parsing.

## Usage

```js
import extractTime from 'extract-time';

extractTime('extracts time from anywhere within the input 14:00');
// [{time: '14:00'}]

extractTime('extracts multiple times located anywhere within the input: 16:00, 18:00');
// [{time: '16:00'}, {time: '18:00'}]

extractTime('distinguish between the civilian 1:30 PM ...');
// [{time: '13:30'}]

extractTime('... and military time formats 13:30');
// [{time: '13:30'}]

extractTime('resolves ambiguous times using the provided time notation bias 1:30', 12);
// [{time: '13:30'}]

```

## Signature

```js
/**
 * Indicates if time format is 12-hour or 24-hour clock notation.
 */
export type TimeNotationType = 12 | 24;

/**
 * @property time 24-hour military time.
 */
type TimeMatchType = {|
  +time: string
|};

/**
 * @param subject Arbitrary text input.
 */
type extractTime = (
  subject: string,
  timeNotation: TimeNotationType,
) => $ReadOnlyArray<TimeMatchType>;

```

## Related projects

* [`extract-date`](https://github.com/gajus/extract-date) – Extracts date from an arbitrary text input.
* [`extract-price`](https://github.com/gajus/extract-price) – Extracts price from an arbitrary text input.
