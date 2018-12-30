// @flow

import test from 'ava';
import createFormats from '../src/createFormats';

const expectedOrder = `hh:mm a
hh:mm A
hh.mm a
hh.mm A
h:mm a
h:mm A
h.mm a
h.mm A
hh:m a
hh:m A
hh.m a
hh.m A
h:m a
h:m A
h.m a
h.m A
hh:mm
HH:mm
hh.mm
HH.mm
h:mm
H:mm
h.mm
H.mm
hh:m
HH:m
hh.m
HH.m
h:m
H:m
h.m
H.m`;

test('orders formats by their specificity (resolves conflicts using localeCompare)', (t) => {
  const formats = createFormats();

  const order = formats
    .map((format) => {
      return format.momentFormat;
    })
    .join('\n');

  // eslint-disable-next-line ava/prefer-power-assert
  t.is(order, expectedOrder);
});
