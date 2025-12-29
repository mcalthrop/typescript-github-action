import * as core from '@actions/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as yup from 'yup';
import { getActionInputs } from './get-action-inputs';

vi.mock('@actions/core');

vi.mocked(core.getInput).mockImplementation((key: string) => `${key}-value`);

describe('getActionInputs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should get and validate inputs correctly with required fields', () => {
    expect.assertions(4);

    const schema = yup.object({
      'input-1': yup.string().required(),
    });

    vi.mocked(core.getInput).mockImplementation(
      (key: string) => `${key}-value`,
    );
    const result = getActionInputs(schema);

    expect(core.info).toHaveBeenCalledWith('Action inputs:');
    expect(core.info).toHaveBeenCalledWith('  input-1: "input-1-value"');
    expect(core.getInput).toHaveBeenCalledWith('input-1');
    expect(result).toEqual({ 'input-1': 'input-1-value' });
  });

  it('should handle empty schema', () => {
    expect.assertions(3);

    const schema = yup.object({});

    const result = getActionInputs(schema);

    expect(core.info).toHaveBeenCalledWith('Action inputs:');
    expect(core.getInput).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it('should throw validation error for missing required fields', () => {
    expect.assertions(2);

    const schema = yup.object({
      'required-input': yup.string().required(),
    });

    vi.mocked(core.getInput).mockReturnValue('');

    expect(() => getActionInputs(schema)).toThrow();
    expect(core.getInput).toHaveBeenCalledWith('required-input');
  });
});
