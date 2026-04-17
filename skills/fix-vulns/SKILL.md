---
name: fix-vulns
description: Check for vulnerabilities with pnpm audit and raise a PR to fix them. Use when the user asks to "fix vulnerabilities", "fix vulns", "audit dependencies", or "fix security issues".
disable-model-invocation: true
allowed-tools: Bash, Read, Edit
---

# fix-vulns

Check for `pnpm` dependency vulnerabilities and raise a PR that addresses all of them.

## Instructions

1. Run the audit:

```bash
zsh -i -c "pnpm audit"
```

2. If no vulnerabilities are found, report that and stop.

3. If vulnerabilities are found, fetch the latest `main` and create a branch:

```bash
git fetch origin main
git checkout -b fix/security-vulnerabilities origin/main
```

4. Attempt to fix all vulnerabilities automatically:

```bash
zsh -i -c "pnpm audit --fix"
```

5. If any vulnerabilities remain after `--fix`, resolve them by manually updating the affected packages to the minimum safe version identified in the audit output:

```bash
zsh -i -c "pnpm update <package-name>"
```

6. Re-run the audit to confirm all vulnerabilities are resolved:

```bash
zsh -i -c "pnpm audit"
```

7. Commit the changes:

```bash
git add pnpm-lock.yaml package.json
git commit -m "fix(deps): resolve pnpm audit vulnerabilities"
```

8. Push the branch and raise a draft PR. The PR body must list every vulnerability that was fixed, including package name, severity, and the resolution applied.
