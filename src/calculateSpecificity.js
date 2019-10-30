// @flow

export default (dateFnsFormat: string): number => {
  let specificity = 0;

  if (dateFnsFormat.toLowerCase().includes('a')) {
    specificity += 50;
  }

  if (dateFnsFormat.toLowerCase().includes('hh')) {
    specificity += 40;
  } else if (dateFnsFormat.toLowerCase().includes('h')) {
    specificity += 30;
  }

  if (dateFnsFormat.includes('mm')) {
    specificity += 20;
  } else if (dateFnsFormat.includes('m')) {
    specificity += 10;
  }

  return specificity + dateFnsFormat.length;
};
