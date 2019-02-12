// @flow

export default (input: string): string => {
  let lastInput = input;

  while (true) {
    const result = lastInput

      // Remove UTC offset.
      .replace(/\+\d{2}:\d{2}/g, ' ')

      // Remove date.
      .replace(/\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/g, '$1 ')

      // Remove seconds.
      .replace(/([^:]|^)(\d{2}:\d{2}):\d{2}(?:[^:]|$)/g, '$1$2 ')
      .replace(/,/g, ' ')
      .replace(/[.:;] /g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (result === lastInput) {
      return result;
    }

    lastInput = result;
  }

  throw new Error('Unexpected state.');
};
