import * as github from '@actions/github';
import { getGithubIssueNumberBySha } from './get-github-issue-number-by-sha';

export type GetGithubIssueNumberArgs = {
  gitHubToken: string;
};

export const getGithubIssueNumber = ({
  gitHubToken,
}: GetGithubIssueNumberArgs): Promise<number> => {
  const { context } = github;
  const {
    issue: { number },
  } = context;

  if (number !== undefined) {
    return Promise.resolve(number);
  }

  const { sha } = context;

  return getGithubIssueNumberBySha({ sha, gitHubToken });
};
