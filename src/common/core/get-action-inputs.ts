import * as core from '@actions/core';
import type { ActionInputsSchema } from '../types';
import type { InferType } from 'yup';

export const getActionInputs = <AIS extends ActionInputsSchema>(
  actionInputsSchema: AIS,
): InferType<AIS> => {
  core.info('Action inputs:');
  const { fields } = actionInputsSchema.describe();
  const inputData = Object.keys(fields).reduce((acc, key) => {
    const value = core.getInput(key);
    core.info(`  ${key}: "${value}"`);
    return { ...acc, [key]: value };
  }, {});

  return actionInputsSchema.validateSync(inputData);
};
