import * as yup from 'yup';
import { action } from './action';
import { execute } from './common/execute';

export const actionInputsSchema = yup.object({
  'labels-to-add': yup.string().required(),
  'labels-to-remove': yup.string().required(),
  'github-token': yup.string().required(),
});

export type ActionInputsSchema = typeof actionInputsSchema;

export type ActionInputs = yup.InferType<ActionInputsSchema>;

export type ActionOutputs = {
  'markdown-message': string;
};

void execute(action, actionInputsSchema);
