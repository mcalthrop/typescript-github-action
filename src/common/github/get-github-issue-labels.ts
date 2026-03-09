import { context, getOctokit } from '@actions/github';
import { getGithubIssueNumber } from './get-github-issue-number';
import type { GithubIssueLabel } from './types';

type GetGithubIssueLabelsArgs = {
  gitHubToken: string;
};

export const getGithubIssueLabels = async ({
  gitHubToken,
}: GetGithubIssueLabelsArgs): Promise<Array<GithubIssueLabel>> => {
  const octokit = getOctokit(gitHubToken);
  const {
    repo: { owner, repo },
  } = context;
  const issueNumber = await getGithubIssueNumber({ gitHubToken });

  // https://octokit.github.io/rest.js/v22/#issues-list-labels-on-issue
  const { data: labels } = await octokit.rest.issues.listLabelsOnIssue({
    owner,
    repo,
    issue_number: issueNumber,
  });

  return labels;
};
