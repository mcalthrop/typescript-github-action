import { describe, expect, it, vi } from 'vitest';
import { Context } from '@actions/github/lib/context';
import type { Octokit } from './types';
import { getGithubIssueLabels } from './get-github-issue-labels';
import { getGithubIssueNumber } from './get-github-issue-number';
import { getOctokit } from '@actions/github';

vi.mock('@actions/github');
vi.mock('./get-github-issue-number');

vi.mocked(getGithubIssueNumber).mockResolvedValue(3396743);
const listLabelsOnIssueMock = vi.fn().mockResolvedValue({
  data: [
    {
      name: 'label1',
      id: 0,
      node_id: '',
      url: '',
      description: null,
      color: '',
      default: false,
    },
  ],
});
vi.mocked(getOctokit).mockReturnValue({
  rest: {
    issues: {
      listLabelsOnIssue: listLabelsOnIssueMock,
    },
  },
} as unknown as Octokit);
vi.spyOn(Context.prototype, 'repo', 'get').mockReturnValue({
  owner: 'test-owner',
  repo: 'test-repo',
});

describe('getGithubIssueLabels', () => {
  it('should return labels for PR', async () => {
    expect.assertions(4);

    const labels = await getGithubIssueLabels({
      gitHubToken: 'test-token',
    });

    expect(getGithubIssueNumber).toHaveBeenCalled();
    expect(getOctokit).toHaveBeenCalledWith('test-token');
    expect(listLabelsOnIssueMock).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 3396743,
    });
    expect(labels).toEqual([
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
  });
});
