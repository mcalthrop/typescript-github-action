import { getOctokit } from '@actions/github';
import { Context } from '@actions/github/lib/context';
import { describe, expect, it, vi } from 'vitest';
import { getGithubIssueNumberBySha } from './get-github-issue-number-by-sha';
import type { Octokit } from './types';

vi.mock('@actions/github');

const issuesAndPullRequestsMock = vi.fn();
vi.mocked(getOctokit).mockReturnValue({
  rest: {
    search: {
      issuesAndPullRequests: issuesAndPullRequestsMock,
    },
  },
} as unknown as Octokit);
vi.spyOn(Context.prototype, 'repo', 'get').mockReturnValue({
  owner: 'test-owner',
  repo: 'test-repo',
});

const sha = 'test-sha';
const gitHubToken = 'test-token';

describe('getGithubIssueNumberBySha', () => {
  it('should throw when no issue is found', async () => {
    issuesAndPullRequestsMock.mockResolvedValue({
      data: {
        items: [],
      },
    });

    await expect(
      getGithubIssueNumberBySha({ sha, gitHubToken }),
    ).rejects.toThrowError('No GitHub issue found for SHA "test-sha"');
  });

  it('should return the PR number when an issue is found', async () => {
    issuesAndPullRequestsMock.mockResolvedValue({
      data: {
        items: [{ number: 3854069 }],
      },
    });

    expect(await getGithubIssueNumberBySha({ sha, gitHubToken })).toBe(3854069);
  });
});
