# Pull Requests

## Creating a PR

- ALWAYS create pull requests in draft mode using the `--draft` flag with `gh pr create`.
- ALWAYS show a link to the created pull request.

## After a PR is Merged

Run the following steps after a pull request has been merged:

1. Fetch and prune remote-tracking branches:

   ```sh
   git fetch --all --prune --prune-tags
   ```

2. Switch to the main branch:

   ```sh
   git checkout main
   ```

3. Delete the local branch for the merged PR:

   ```sh
   git branch -D <branch-name>
   ```

4. Pull the latest changes from main:

   ```sh
   git pull origin main
   ```

5. Install packages using the appropriate package manager for the repo (e.g. `pnpm install`, `npm install`, `yarn install`, `pip install -r requirements.txt`).
