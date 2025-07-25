import * as github from '@actions/github';
import { describe, expect, it, vi } from 'vitest';
import { getGithubIssueNumber } from './get-github-issue-number';
import { getGithubIssueNumberBySha } from './get-github-issue-number-by-sha';

vi.mock('@actions/github');
vi.mock('./get-github-issue-number-by-sha');

describe('getGithubIssueNumber', () => {
  it('should return the PR number from github context', async () => {
    expect.assertions(2);

    vi.spyOn(github.context, 'issue', 'get').mockReturnValue({
      owner: 'test-owner',
      repo: 'test-repo',
      number: 123,
    });

    expect(await getGithubIssueNumber({ gitHubToken: 'test-token' })).toBe(123);
    expect(getGithubIssueNumberBySha).not.toHaveBeenCalled();
  });

  it('should get the PR number by SHA when PR is merged', async () => {
    expect.assertions(2);

    vi.spyOn(github.context, 'issue', 'get').mockReturnValue({
      owner: 'test-owner',
      repo: 'test-repo',
      // @ts-expect-error When PR is merged, the value of `number` is `undefined` (despite the TS type)
      number: undefined,
    });
    vi.spyOn(github.context, 'sha', 'get').mockReturnValue('test-sha');
    vi.mocked(getGithubIssueNumberBySha).mockResolvedValue(3831044);

    expect(await getGithubIssueNumber({ gitHubToken: 'test-token' })).toBe(
      3831044,
    );
    expect(getGithubIssueNumberBySha).toHaveBeenCalledWith({
      sha: 'test-sha',
      gitHubToken: 'test-token',
    });
  });
});
