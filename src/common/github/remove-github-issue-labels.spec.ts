import { getOctokit } from '@actions/github';
import { Context } from '@actions/github/lib/context';
import { describe, expect, it, vi } from 'vitest';
import { getGithubIssueLabels } from './get-github-issue-labels';
import { getGithubIssueNumber } from './get-github-issue-number';
import { removeGithubIssueLabels } from './remove-github-issue-labels';
import type { Octokit } from './types';

vi.mock('@actions/github');
vi.mock('./get-github-issue-number');
vi.mock('./get-github-issue-labels');

vi.mocked(getGithubIssueNumber).mockResolvedValue(8675309);
const removeLabelMock = vi.fn();
vi.mocked(getOctokit).mockReturnValue({
  rest: {
    issues: {
      removeLabel: removeLabelMock,
    },
  },
} as unknown as Octokit);
vi.spyOn(Context.prototype, 'repo', 'get').mockReturnValue({
  owner: 'test-owner',
  repo: 'test-repo',
});
vi.mocked(getGithubIssueLabels).mockResolvedValue([
  {
    name: 'label1',
    id: 0,
    node_id: '',
    url: '',
    description: null,
    color: '',
    default: false,
  },
]);

describe('removeGithubIssueLabels', () => {
  it('should remove labels from PR if they exist', async () => {
    expect.assertions(3);

    await removeGithubIssueLabels({
      labels: ['label1', 'label2'],
      gitHubToken: 'test-token',
    });

    expect(getOctokit).toHaveBeenCalledWith('test-token');
    expect(removeLabelMock).toHaveBeenCalledTimes(1);
    expect(removeLabelMock).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 8675309,
      name: 'label1',
    });
  });

  it('should not remove labels from PR if they do not exist', async () => {
    expect.assertions(3);

    await removeGithubIssueLabels({
      labels: ['label999'],
      gitHubToken: 'test-token',
    });

    expect(getOctokit).not.toHaveBeenCalled();
    expect(getGithubIssueNumber).toHaveBeenCalledTimes(1);
    expect(removeLabelMock).not.toHaveBeenCalled();
  });

  it('should handle empty labels array', async () => {
    expect.assertions(3);

    await removeGithubIssueLabels({
      labels: [],
      gitHubToken: 'test-token',
    });

    expect(getGithubIssueNumber).not.toHaveBeenCalled();
    expect(getOctokit).not.toHaveBeenCalled();
    expect(removeLabelMock).not.toHaveBeenCalled();
  });
});
