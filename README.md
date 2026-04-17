# ai-resources

A centralised collection of AI coding resources (rules and skills), shareable across multiple repos via `git subtree`.

**Rules** live in [`rules`](./rules/) as focused markdown files.

**Skills** live in [`skills`](./skills/).

> **Other AI tools** (Cursor, Copilot, Windsurf, etc.) use different mechanisms to load rules. Refer to their documentation for how to reference external markdown files.

## Using these resources in your repo

### Add this repo as a subtree

Run this once in your target repo, from the repo root:

```sh
git checkout -b chore/add-ai-resources
git subtree add --prefix ai-resources https://github.com/mcalthrop/ai-resources main --squash
```

`git subtree add` creates a commit automatically, so create a branch first to keep the change reviewable via a PR.

### Import all rules and skills

To import all rules and skills, add a single line to your `CLAUDE.md` or `AGENTS.md`:

```md
@ai-resources/CLAUDE.md
```

### Set up skills as slash commands

Skills become available as slash commands (e.g. `/md2pdf`) once they are symlinked into the consuming repo's `.claude/skills/` directory.

If your `CLAUDE.md` imports `@ai-resources/CLAUDE.md`, Claude already knows how to set up the symlinks. Just tell it:

> link skills

Claude will create the symlinks automatically via the bundled `link-skills` skill.

### Import specific rules

To import only the rules you need, import them to your `CLAUDE.md` or `AGENTS.md`:

```md
@ai-resources/rules/general.md
@ai-resources/rules/pull-requests.md
@ai-resources/rules/conventional-commits.md
@ai-resources/rules/conventional-branch-names.md
```

The tool reads the instructions file automatically, so the imported rules are always active.

### Update the resources

When the resources in this repo change, your repo won't automatically see them.

So to pick them up, create a branch and pull in the latest changes:

```sh
git checkout -b chore/update-ai-resources
git subtree pull --prefix ai-resources https://github.com/mcalthrop/ai-resources main --squash
```

Like `git subtree add`, this creates a commit automatically.

If you are importing individual files, check whether any rules were added, removed, or renamed and update your instructions file accordingly.
