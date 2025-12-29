import { getOctokit } from '@actions/github';
import { Context } from '@actions/github/lib/context';

export type GetGithubIssueNumberByShaArgs = {
  sha: string;
  gitHubToken: string;
};

export const getGithubIssueNumberBySha = async ({
  sha,
  gitHubToken,
}: GetGithubIssueNumberByShaArgs): Promise<number> => {
  const octokit = getOctokit(gitHubToken);
  const {
    repo: { owner, repo },
  } = new Context();

  // https://octokit.github.io/rest.js/v22/#search-issues-and-pull-requests
  const {
    data: { items },
  } = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${owner}/${repo} is:merged ${sha}`,
    advanced_search: true,
  });

  if (items.length === 0) {
    return Promise.reject(Error(`No GitHub issue found for SHA "${sha}"`));
  }

  const [{ number }] = items;

  return number;
};
