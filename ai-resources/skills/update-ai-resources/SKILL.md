---
name: update-ai-resources
description: Update the ai-resources snapshot in the current repo to the latest version from GitHub. Use when the user asks to "update ai-resources", "pull latest ai-resources", or "refresh ai-resources".
allowed-tools: Bash
---

# update-ai-resources

Download the latest snapshot of ai-resources from GitHub and commit the update on a new branch.

## Instructions

1. Confirm that an `ai-resources/` directory exists in the current working directory. If not, abort and tell the user to add ai-resources first (see the ai-resources README).

2. Create a worktree from `origin/main`, removing any existing worktree and branch of the same name first:

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
REPO_NAME="$(basename "${REPO_ROOT}")"
WORKTREE_PATH="${REPO_ROOT}/../${REPO_NAME}-chore-update-ai-resources"
git fetch origin main
if [[ -e "${WORKTREE_PATH}" ]]; then
  git worktree remove --force "${WORKTREE_PATH}" || {
    echo "Failed to remove existing worktree at ${WORKTREE_PATH}. Resolve it and retry." >&2
    exit 1
  }
fi
if git show-ref --verify --quiet refs/heads/chore/update-ai-resources; then
  git branch --delete --force chore/update-ai-resources || {
    echo "Failed to delete existing branch chore/update-ai-resources. Resolve it and retry." >&2
    exit 1
  }
fi
git worktree add -b chore/update-ai-resources "${WORKTREE_PATH}" origin/main
```

3. Download the latest snapshot into a temp directory, then replace `ai-resources/` inside the worktree:

```bash
TMP_DIR="$(mktemp --directory)"
curl --location https://github.com/mcalthrop/ai-resources/archive/refs/heads/main.tar.gz \
  | tar --extract --gzip --strip-components=1 --directory "$TMP_DIR"
rm -rf "${WORKTREE_PATH}/ai-resources"
mv "$TMP_DIR" "${WORKTREE_PATH}/ai-resources"
```

4. Check whether anything changed:

```bash
git -C "${WORKTREE_PATH}" diff --stat ai-resources
```

If there are no changes, remove the worktree and branch, report that ai-resources is already up to date, and stop:

```bash
git -C "${REPO_ROOT}" worktree remove "${WORKTREE_PATH}"
git branch --delete chore/update-ai-resources
```

5. Stage and commit the changes from within the worktree:

```bash
git -C "${WORKTREE_PATH}" add ai-resources
git -C "${WORKTREE_PATH}" commit -m "chore: update ai-resources snapshot"
```

6. Ask the user: "Would you like to link the skills so they are available as slash commands?"

   - If yes, run the `link-skills` skill.
   - If no, continue.

7. Report which files changed.

8. Ask the user: "Would you like me to raise a draft PR?"

   - If yes, push the branch and create a draft PR:

     ```bash
     git -C "${WORKTREE_PATH}" push --set-upstream origin chore/update-ai-resources
     (cd "${WORKTREE_PATH}" && gh pr create --draft --title "chore: update ai-resources snapshot")
     ```

     The worktree will be removed as part of the post-merge steps.

   - If no, remind the user to raise a PR when ready. The worktree will be removed as part of the post-merge steps.
