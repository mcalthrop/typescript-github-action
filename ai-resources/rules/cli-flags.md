# CLI Flags

Prefer long-form CLI flags when they are available (e.g. `--location` not `-L`, `--directory` not `-C`, `--verbose` not `-v`).

Commands should be self-documenting; short flags are opaque to readers unfamiliar with the tool. Short flags are acceptable when no long-form equivalent exists (e.g. `git checkout -b`). This applies to shell commands in code, skills, rules, and documentation.
