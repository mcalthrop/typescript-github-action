import type { Action, ActionInputsSchema, ActionOutputs } from './types';
import { getActionInputs } from './core/get-action-inputs';
import { setActionOutputs } from './core/set-action-outputs';

export const execute = async <
  AIS extends ActionInputsSchema,
  AO extends ActionOutputs,
>(
  action: Action<AIS, AO>,
  actionInputsSchema: AIS,
): Promise<void> => {
  const actionInputs = getActionInputs(actionInputsSchema);
  const actionOutputs = await action(actionInputs);
  setActionOutputs(actionOutputs);
};
