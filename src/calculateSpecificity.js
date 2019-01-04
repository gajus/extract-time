// @flow

export default (momentFormat: string): number => {
  let specificity = 0;

  if (momentFormat.toLowerCase().includes('a')) {
    specificity += 50;
  }

  if (momentFormat.toLowerCase().includes('hh')) {
    specificity += 40;
  } else if (momentFormat.toLowerCase().includes('h')) {
    specificity += 30;
  }

  if (momentFormat.includes('mm')) {
    specificity += 20;
  } else if (momentFormat.includes('m')) {
    specificity += 10;
  }

  return specificity + momentFormat.length;
};
