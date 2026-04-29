import type { InferType, ObjectSchema } from 'yup';

export type ActionInputsSchema = ObjectSchema<Record<string, string>>;

type ActionOutputValue = string | boolean | number | null;
export type ActionOutputs = Record<string, ActionOutputValue>;

export type Action<AIS extends ActionInputsSchema, AO extends ActionOutputs> = (
  actionInputs: InferType<AIS>,
) => Promise<AO>;
