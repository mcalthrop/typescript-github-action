import { getOctokit } from '@actions/github';
import { Context } from '@actions/github/lib/context';
import { getGithubIssueLabels } from './get-github-issue-labels';
import { getGithubIssueNumber } from './get-github-issue-number';

export type RemoveGithubIssueLabelsArgs = {
  labels: Array<string>;
  gitHubToken: string;
};

export const removeGithubIssueLabels = async ({
  labels,
  gitHubToken,
}: RemoveGithubIssueLabelsArgs): Promise<void> => {
  if (labels.length === 0) {
    return;
  }

  const issueNumber = await getGithubIssueNumber({ gitHubToken });
  const existingLabels = await getGithubIssueLabels({ gitHubToken });
  const labelsToRemove = labels.filter((label) =>
    existingLabels.find(({ name }) => name === label),
  );

  if (labelsToRemove.length === 0) {
    return;
  }

  const octokit = getOctokit(gitHubToken);
  const {
    repo: { owner, repo },
  } = new Context();

  for (const labelToRemove of labelsToRemove) {
    // https://octokit.github.io/rest.js/v22/#issues-remove-label
    await octokit.rest.issues.removeLabel({
      owner,
      repo,
      issue_number: issueNumber,
      name: labelToRemove,
    });
  }
};
