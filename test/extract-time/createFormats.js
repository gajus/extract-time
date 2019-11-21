// @flow

import test from 'ava';
import createFormats from '../../src/createFormats';

const expectedOrder = `hh:mm a
hh.mm a
hh:mma
hh.mma
h:mm a
h.mm a
hh:m a
hh.m a
h:mma
h.mma
hh:ma
hh.ma
h:m a
h.m a
h:ma
h.ma
hha
ha
HH:mm:ss
HH:mm
HH.mm
H:mm
H.mm
HH:m
HH.m
H:m
H.m`;

const onlyCivilianNotation = `hh:mm a
hh.mm a
hh:mma
hh.mma
h:mm a
h.mm a
hh:m a
hh.m a
h:mma
h.mma
hh:ma
hh.ma
h:m a
h.m a
h:ma
h.ma
hh:mm
hh.mm
h:mm
h.mm
hh:m
hh.m
h:m
h.m`;

const onlyMilitaryNotation = `HH:mm:ss
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
      return format.dateFnsFormat;
    })
    .join('\n');

  t.is(order, expectedOrder);
});

test('restricts formats to a specific time notation (12)', (t) => {
  const formats = createFormats(12);

  const order = formats
    .map((format) => {
      return format.dateFnsFormat;
    })
    .join('\n');

  t.is(order, onlyCivilianNotation);
});

test('restricts formats to a specific time notation (24)', (t) => {
  const formats = createFormats(24);

  const order = formats
    .map((format) => {
      return format.dateFnsFormat;
    })
    .join('\n');

  t.is(order, onlyMilitaryNotation);
});
