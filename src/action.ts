import type { ActionInputs, ActionInputsSchema, ActionOutputs } from './index';
import type { Action } from './common/types';
import { addGithubIssueLabels } from './common/github/add-github-issue-labels';
import { getLabelsFromInput } from './common/get-labels-from-input';
import { removeGithubIssueLabels } from './common/github/remove-github-issue-labels';

export const action: Action<ActionInputsSchema, ActionOutputs> = async (
  actionInputs: ActionInputs,
) => {
  const labelsToAdd = getLabelsFromInput(actionInputs['labels-to-add']);
  const labelsToRemove = getLabelsFromInput(actionInputs['labels-to-remove']);
  const { 'github-token': gitHubToken } = actionInputs;

  await addGithubIssueLabels({ labels: labelsToAdd, gitHubToken });
  await removeGithubIssueLabels({ labels: labelsToRemove, gitHubToken });

  const markdownMessage = [
    '## GitHub labels',
    `Labels added: [${labelsToAdd.join(', ')}]`,
    `Labels removed: [${labelsToRemove.join(', ')}]`,
  ].join('\n');
  const actionOutputs: ActionOutputs = {
    'markdown-message': markdownMessage,
  };

  return Promise.resolve(actionOutputs);
};
