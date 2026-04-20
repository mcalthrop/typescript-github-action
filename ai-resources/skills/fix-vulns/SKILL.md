---
name: fix-vulns
description: Check for vulnerabilities with an audit command and raise a PR to fix them. Use when the user asks to "fix vulnerabilities", "fix vulns", "audit dependencies", or "fix security issues".
allowed-tools: Bash
---

# fix-vulns

Check for dependency vulnerabilities and raise a PR that addresses all of them.

## Instructions

1. Detect the package manager by checking for lock files in the current working directory:

   - `pnpm-lock.yaml` → `pnpm`
   - `yarn.lock` → `yarn`
   - `package-lock.json` → `npm`

   If none is found, report that no recognised lock file was found and stop.

   For `yarn`, also detect the major version (check the `packageManager` field in `package.json`, or run `yarn --version`) to determine whether it is Yarn Classic (v1) or Yarn Berry (v2+), as commands differ between versions.

2. Run the audit using the appropriate command:

| Package manager | Audit command     |
| --------------- | ----------------- |
| `pnpm`          | `pnpm audit`      |
| `yarn` (v1)     | `yarn audit`      |
| `yarn` (v2+)    | `yarn npm audit`  |
| `npm`           | `npm audit`       |

```bash
"${SHELL:-/bin/bash}" -i -c "<audit-command>"
```

3. If no vulnerabilities are found, report that and stop.

4. If vulnerabilities are found, fetch the latest `main` and create a worktree:

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
REPO_NAME="$(basename "${REPO_ROOT}")"
WORKTREE_PATH="${REPO_ROOT}/../${REPO_NAME}-fix-security-vulnerabilities"
git fetch origin main
if [[ -e "${WORKTREE_PATH}" ]]; then
  git worktree remove --force "${WORKTREE_PATH}" || {
    echo "Failed to remove existing worktree at ${WORKTREE_PATH}. Resolve it and retry." >&2
    exit 1
  }
fi
if git show-ref --verify --quiet refs/heads/fix/security-vulnerabilities; then
  git branch --delete --force fix/security-vulnerabilities || {
    echo "Failed to delete existing branch fix/security-vulnerabilities. Resolve it and retry." >&2
    exit 1
  }
fi
git worktree add -b fix/security-vulnerabilities "${WORKTREE_PATH}" origin/main
```

5. For each vulnerable package identified in the audit output, update it to the minimum safe version using the appropriate command. Run all subsequent commands from within `${WORKTREE_PATH}`.

| Package manager | Update command |
| --------------- | -------------- |
| `pnpm`          | `update`       |
| `yarn` (v1)     | `upgrade`      |
| `yarn` (v2+)    | `up`           |
| `npm`           | `update`       |

```bash
"${SHELL:-/bin/bash}" -i -c "<package-manager> <update-command> <package-name>"
```

If the required safe version exceeds the current semver range in `package.json`, update the range in `package.json` first, then re-run the update command.

For transitive (indirect) dependencies that cannot be updated directly, add an overrides entry in `package.json` to force the minimum safe version across the entire dependency tree:

| Package manager | Key in `package.json`  |
| --------------- | ---------------------- |
| `pnpm`          | `pnpm.overrides`       |
| `yarn`          | `resolutions`          |
| `npm`           | `overrides`            |

Example for `pnpm`:

```json
{
  "pnpm": {
    "overrides": {
      "<package-name>": "<minimum-safe-version>"
    }
  }
}
```

Then run install to apply the override:

```bash
"${SHELL:-/bin/bash}" -i -c "<package-manager> install"
```

6. Re-run the audit to confirm all vulnerabilities are resolved:

```bash
"${SHELL:-/bin/bash}" -i -c "<audit-command>"
```

7. Commit the changes, staging only the lock file and `package.json`:

```bash
git add <lock-file> package.json
git commit -m "fix(deps): resolve audit vulnerabilities"
```

8. Push the branch from within the worktree and raise a draft PR:

```bash
cd "${WORKTREE_PATH}"
git push --set-upstream origin fix/security-vulnerabilities
gh pr create --draft --title "fix(deps): resolve audit vulnerabilities" --body "..."
```

The PR body must list every vulnerability that was fixed, including package name, severity, and the resolution applied.

The worktree will be removed as part of the post-merge steps.
