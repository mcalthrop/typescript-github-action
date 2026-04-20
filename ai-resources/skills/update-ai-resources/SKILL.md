---
name: update-ai-resources
description: Update the ai-resources snapshot in the current repo to the latest version from GitHub. Use when the user asks to "update ai-resources", "pull latest ai-resources", or "refresh ai-resources".
disable-model-invocation: true
allowed-tools: Bash
---

# update-ai-resources

Download the latest snapshot of ai-resources from GitHub and commit the update on a new branch.

## Instructions

1. Confirm that an `ai-resources/` directory exists in the current working directory. If not, abort and tell the user to add ai-resources first (see the ai-resources README).

2. Create a branch from `origin/main`, deleting any existing local branch of the same name first:

```bash
git fetch origin main
git branch --delete --force chore/update-ai-resources 2>/dev/null || :
git checkout -b chore/update-ai-resources origin/main
```

3. Download the latest snapshot into a temp directory, then replace `ai-resources/`:

```bash
TMP_DIR="$(mktemp --directory)"
curl --location https://github.com/mcalthrop/ai-resources/archive/refs/heads/main.tar.gz \
  | tar --extract --gzip --strip-components=1 --directory "$TMP_DIR"
rm -rf ai-resources
mv "$TMP_DIR" ai-resources
```

4. Check whether anything changed:

```bash
git diff --stat ai-resources
```

If there are no changes, switch back to the previous branch, delete `chore/update-ai-resources`, report that ai-resources is already up to date, and stop:

```bash
git checkout -
git branch --delete chore/update-ai-resources
```

5. Stage and commit the changes:

```bash
git add ai-resources
git commit -m "chore: update ai-resources snapshot"
```

6. Report which files changed and remind the user to raise a PR.
