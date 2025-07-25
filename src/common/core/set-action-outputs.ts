import * as core from '@actions/core';

import type { ActionOutputs } from '../types';

export const setActionOutputs = (actionOutputs: ActionOutputs): void => {
  core.info('Action outputs:');
  Object.entries(actionOutputs).forEach(([key, value]) => {
    core.info(`  ${key}: "${value}"`);
    core.setOutput(key, value);
  });
};
