import { Context } from '@actions/github/lib/context';
import type { GithubIssueLabel } from './types';
import { getGithubIssueNumber } from './get-github-issue-number';
import { getOctokit } from '@actions/github';

export type GetGithubIssueLabelsArgs = {
  gitHubToken: string;
};

export const getGithubIssueLabels = async ({
  gitHubToken,
}: GetGithubIssueLabelsArgs): Promise<Array<GithubIssueLabel>> => {
  const octokit = getOctokit(gitHubToken);
  const {
    repo: { owner, repo },
  } = new Context();
  const issueNumber = await getGithubIssueNumber({ gitHubToken });

  // https://octokit.github.io/rest.js/v22/#issues-list-labels-on-issue
  const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number: issueNumber,
  });

  return labels;
};
