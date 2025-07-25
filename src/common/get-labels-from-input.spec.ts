import { describe, expect, it } from 'vitest';
import { getLabelsFromInput } from './get-labels-from-input';

describe('getLabelsFromInput', () => {
  it('should return array of labels from input', () => {
    const input = 'label1, label2, label3';
    const expected = ['label1', 'label2', 'label3'];
    expect(getLabelsFromInput(input)).toEqual(expected);
  });

  it('should return array of labels from input with no spaces', () => {
    const input = 'label1,label2,label3';
    const expected = ['label1', 'label2', 'label3'];
    expect(getLabelsFromInput(input)).toEqual(expected);
  });

  it('should return array of labels from input with no spaces and no commas', () => {
    const input = 'label1label2label3';
    const expected = ['label1label2label3'];
    expect(getLabelsFromInput(input)).toEqual(expected);
  });
});
