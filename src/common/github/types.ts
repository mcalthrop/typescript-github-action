import type { getOctokit } from '@actions/github';

export type Octokit = ReturnType<typeof getOctokit>;
export type GithubIssueLabel = Awaited<
  ReturnType<Octokit['rest']['issues']['listLabelsOnIssue']>
>['data'][number];
