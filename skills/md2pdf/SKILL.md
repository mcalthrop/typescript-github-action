---
name: md2pdf
description: Convert a Markdown file to PDF. Use when the user asks to convert a .md file to PDF, generate a PDF from Markdown, or run md-to-pdf.
argument-hint: <input.md>
disable-model-invocation: true
allowed-tools: Bash
---

# md2pdf

Convert a Markdown file to PDF using `npx md-to-pdf` with the config bundled in this skill directory.

## Instructions

The user invoked this with: $ARGUMENTS

1. Resolve the input file path from `$ARGUMENTS`. If a relative path is given, resolve it relative to the current working directory.
2. Ensure Chrome is available for Puppeteer:

```bash
zsh -i -c "npx puppeteer browsers install chrome"
```

3. Determine the absolute path to this skill's directory (where this SKILL.md lives) — it contains `md-to-pdf.config.js`.
4. Run the conversion:

```bash
zsh -i -c "npx md-to-pdf --config-file '<skill-dir>/md-to-pdf.config.js' <input-file>"
```

5. Report the path of the generated PDF (same directory as the input file, with a `.pdf` extension).

## Notes

- The config adds a footer with a left-aligned `Generated: <timestamp>`, a centre-aligned filename, and a right-aligned `Page X of Y`.
- Bottom margin is increased to prevent the footer overlapping content.
- On Mac Silicon with an x64 Node install, a "Degraded performance warning" about Rosetta may appear — this is harmless.
- The `zsh -i -c "..."` wrapper ensures the correct Node version from `.nvmrc` is active.
