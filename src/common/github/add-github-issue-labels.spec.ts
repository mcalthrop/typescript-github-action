import { describe, expect, it, vi } from 'vitest';
import { Context } from '@actions/github/lib/context';
import type { Octokit } from './types';
import { addGithubIssueLabels } from './add-github-issue-labels';
import { getGithubIssueNumber } from './get-github-issue-number';
import { getOctokit } from '@actions/github';

vi.mock('@actions/github');
vi.mock('./get-github-issue-number');

vi.mocked(getGithubIssueNumber).mockResolvedValue(3841047);
const addLabelsMock = vi.fn();
vi.mocked(getOctokit).mockReturnValue({
  rest: {
    issues: {
      addLabels: addLabelsMock,
    },
  },
} as unknown as Octokit);
vi.spyOn(Context.prototype, 'repo', 'get').mockReturnValue({
  owner: 'test-owner',
  repo: 'test-repo',
});

describe('addGithubIssueLabels', () => {
  it('should add labels to PR', async () => {
    expect.assertions(3);

    await addGithubIssueLabels({
      labels: ['label1', 'label2'],
      gitHubToken: 'test-token',
    });

    expect(getGithubIssueNumber).toHaveBeenCalled();
    expect(getOctokit).toHaveBeenCalledWith('test-token');
    expect(addLabelsMock).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 3841047,
      labels: ['label1', 'label2'],
    });
  });

  it('should handle empty labels array', async () => {
    expect.assertions(3);

    await addGithubIssueLabels({
      labels: [],
      gitHubToken: 'test-token',
    });

    expect(getGithubIssueNumber).not.toHaveBeenCalled();
    expect(getOctokit).not.toHaveBeenCalled();
    expect(addLabelsMock).not.toHaveBeenCalled();
  });
});
