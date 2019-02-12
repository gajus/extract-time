// @flow

import test from 'ava';
import createFormats from '../../src/createFormats';

const expectedOrder = `hh:mm a
hh:mm A
hh.mm a
hh.mm A
hh:mma
hh:mmA
hh.mma
hh.mmA
h:mm a
h:mm A
h.mm a
h.mm A
hh:m a
hh:m A
hh.m a
hh.m A
h:mma
h:mmA
h.mma
h.mmA
hh:ma
hh:mA
hh.ma
hh.mA
h:m a
h:m A
h.m a
h.m A
h:ma
h:mA
h.ma
h.mA
hha
hhA
ha
hA
HH:mm:ss
HH:mm
HH.mm
H:mm
H.mm
HH:m
HH.m
H:m
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
