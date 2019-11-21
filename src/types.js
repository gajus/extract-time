// @flow

/**
 * Indicates if time format is 12-hour or 24-hour clock notation.
 */
export type TimeNotationType = 12 | 24;

/**
 * @property time 24-hour military time.
 */
export type TimeMatchType = {|
  +time: string,
|};
