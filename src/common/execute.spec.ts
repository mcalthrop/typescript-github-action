import { describe, expect, it, vi } from 'vitest';
import * as yup from 'yup';
import { getActionInputs } from './core/get-action-inputs';
import { setActionOutputs } from './core/set-action-outputs';
import { execute } from './execute';

vi.mock('./core/get-action-inputs');
vi.mock('./core/set-action-outputs');

describe('execute', () => {
  it('should execute the action correctly', async () => {
    const action = vi.fn().mockResolvedValue({ output1: 'value1' });
    const actionInputsSchema = yup.object({});
    vi.mocked(getActionInputs).mockReturnValue({ input1: 'value1' });

    await execute(action, actionInputsSchema);

    expect(getActionInputs).toHaveBeenCalledWith(actionInputsSchema);
    expect(action).toHaveBeenCalledWith({ input1: 'value1' });
    expect(setActionOutputs).toHaveBeenCalledWith({ output1: 'value1' });
  });
});
