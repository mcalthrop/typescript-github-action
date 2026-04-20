# ai-resources

A centralised collection of AI coding resources (rules and skills), shareable across multiple repos by downloading a snapshot.

**Rules** live in [`rules`](./rules/) as focused markdown files.

**Skills** live in [`skills`](./skills/).

> **Other AI tools** (Cursor, Copilot, Windsurf, etc.) use different mechanisms to load rules. Refer to their documentation for how to reference external markdown files.

## Using these resources in your repo

### Add ai-resources to your repo

Run this once in your target repo, from the repo root:

```sh
git checkout -b chore/add-ai-resources
TMP_DIR="$(mktemp --directory)"
curl --location https://github.com/mcalthrop/ai-resources/archive/refs/heads/main.tar.gz \
  | tar --extract --gzip --strip-components=1 --directory "$TMP_DIR"
rm -rf ai-resources
mv "$TMP_DIR" ai-resources
git add ai-resources
git commit -m "chore: add ai-resources snapshot"
```

Then ask Claude to create a PR:

> create a pr

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

To pick up the latest changes, use the bundled `/update-ai-resources` skill (if you have skills linked). For manual steps, see [`skills/update-ai-resources/`](./skills/update-ai-resources/).

If your `CLAUDE.md` imports `@ai-resources/CLAUDE.md`, Claude already knows how to run the skill. Just tell it:

> update ai-resources

If you are importing individual files, check whether any rules were added, removed, or renamed and update your instructions file accordingly.
