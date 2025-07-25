export const getLabelsFromInput = (input: string): Array<string> =>
  input.split(',').map((label) => label.trim());
