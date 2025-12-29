import { describe, expect, it, vi } from 'vitest';
import { action } from './action';
import { getLabelsFromInput } from './common/get-labels-from-input';
import { addGithubIssueLabels } from './common/github/add-github-issue-labels';
import { removeGithubIssueLabels } from './common/github/remove-github-issue-labels';
import type { ActionInputs } from './index';

vi.mock('./common/github/add-github-issue-labels');
vi.mock('./common/github/remove-github-issue-labels');
vi.mock('./common/get-labels-from-input');

describe('action', () => {
  it('should return correct action outputs', async () => {
    vi.mocked(getLabelsFromInput).mockReturnValueOnce(['label1', 'label2']);
    vi.mocked(getLabelsFromInput).mockReturnValueOnce(['label3', 'label4']);

    const actionInputs: ActionInputs = {
      'labels-to-add': 'label1, label2',
      'labels-to-remove': 'label3, label4',
      'github-token': 'test-token',
    };

    const actionOutputs = await action(actionInputs);

    expect(addGithubIssueLabels).toHaveBeenCalledWith({
      labels: ['label1', 'label2'],
      gitHubToken: 'test-token',
    });
    expect(removeGithubIssueLabels).toHaveBeenCalledWith({
      labels: ['label3', 'label4'],
      gitHubToken: 'test-token',
    });
    expect(actionOutputs).toEqual({
      'markdown-message': [
        '## GitHub labels',
        'Labels added: [label1, label2]',
        'Labels removed: [label3, label4]',
      ].join('\n'),
    });
  });
});
