import { Context } from '@actions/github/lib/context';
import { getGithubIssueNumber } from './get-github-issue-number';
import { getOctokit } from '@actions/github';

export type AddGithubIssueLabelsArgs = {
  labels: Array<string>;
  gitHubToken: string;
};

export const addGithubIssueLabels = async ({
  labels,
  gitHubToken,
}: AddGithubIssueLabelsArgs): Promise<void> => {
  if (labels.length === 0) {
    return;
  }

  const issueNumber = await getGithubIssueNumber({ gitHubToken });
  const octokit = getOctokit(gitHubToken);
  const {
    repo: { owner, repo },
  } = new Context();

  // https://octokit.github.io/rest.js/v22/#issues-add-labels
  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  });
};
