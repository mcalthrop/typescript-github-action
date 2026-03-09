import { context, getOctokit } from '@actions/github';
import { getGithubIssueNumber } from './get-github-issue-number';

type AddGithubIssueLabelsArgs = {
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
  } = context;

  // https://octokit.github.io/rest.js/v22/#issues-add-labels
  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  });
};
