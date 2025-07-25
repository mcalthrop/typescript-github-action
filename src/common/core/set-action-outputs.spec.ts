import * as core from '@actions/core';
import { describe, expect, it, vi } from 'vitest';
import type { ActionOutputs } from '../types';
import { setActionOutputs } from './set-action-outputs';

vi.mock('@actions/core');

describe('setActionOutputs', () => {
  it('should log and set string outputs correctly', () => {
    expect.assertions(4);

    const actionOutputs: ActionOutputs = {
      'output-1': 'value1',
      'output-2': 'value2',
    };

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('Action outputs:');
    expect(core.info).toHaveBeenCalledWith('  output-1: "value1"');
    expect(core.info).toHaveBeenCalledWith('  output-2: "value2"');
    expect(core.setOutput).toHaveBeenCalledTimes(2);
  });

  it('should handle boolean outputs correctly', () => {
    expect.assertions(3);

    const actionOutputs: ActionOutputs = {
      'is-success': true,
      'is-failure': false,
    };

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('  is-success: "true"');
    expect(core.setOutput).toHaveBeenCalledWith('is-success', true);
    expect(core.setOutput).toHaveBeenCalledWith('is-failure', false);
  });

  it('should handle number outputs correctly', () => {
    expect.assertions(4);

    const actionOutputs: ActionOutputs = {
      count: 335913,
      percentage: 85.5,
      zero: 0,
    };

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('  count: "335913"');
    expect(core.setOutput).toHaveBeenCalledWith('count', 335913);
    expect(core.setOutput).toHaveBeenCalledWith('percentage', 85.5);
    expect(core.setOutput).toHaveBeenCalledWith('zero', 0);
  });

  it('should handle null outputs correctly', () => {
    expect.assertions(2);

    const actionOutputs: ActionOutputs = {
      'nullable-output': null,
    };

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('  nullable-output: "null"');
    expect(core.setOutput).toHaveBeenCalledWith('nullable-output', null);
  });

  it('should handle empty outputs object', () => {
    expect.assertions(2);

    const actionOutputs: ActionOutputs = {};

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('Action outputs:');
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  it('should handle mixed types of outputs', () => {
    expect.assertions(6);

    const actionOutputs: ActionOutputs = {
      message: 'Hello World',
      success: true,
      count: 123,
      result: null,
    };

    setActionOutputs(actionOutputs);

    expect(core.setOutput).toHaveBeenCalledWith('message', 'Hello World');
    expect(core.setOutput).toHaveBeenCalledWith('success', true);
    expect(core.setOutput).toHaveBeenCalledWith('count', 123);
    expect(core.setOutput).toHaveBeenCalledWith('result', null);
    expect(core.setOutput).toHaveBeenCalledTimes(4);
    expect(core.info).toHaveBeenCalledTimes(5); // 1 header + 4 outputs
  });

  it('should handle outputs with special characters in keys', () => {
    expect.assertions(3);

    const actionOutputs: ActionOutputs = {
      'output-with-dashes': 'value1',
      output_with_underscores: 'value2',
      'output.with.dots': 'value3',
    };

    setActionOutputs(actionOutputs);

    expect(core.setOutput).toHaveBeenCalledWith('output-with-dashes', 'value1');
    expect(core.setOutput).toHaveBeenCalledWith(
      'output_with_underscores',
      'value2',
    );
    expect(core.setOutput).toHaveBeenCalledWith('output.with.dots', 'value3');
  });

  it('should handle outputs with empty string values', () => {
    expect.assertions(2);

    const actionOutputs: ActionOutputs = {
      'empty-string': '',
    };

    setActionOutputs(actionOutputs);

    expect(core.info).toHaveBeenCalledWith('  empty-string: ""');
    expect(core.setOutput).toHaveBeenCalledWith('empty-string', '');
  });
});
