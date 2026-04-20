# Running Commands in a Shell

When running commands in a shell, use the user's configured/login shell in interactive mode so that the shell's `*rc` file is sourced:

```sh
"${SHELL:-/bin/sh}" -i -c "..."
```

Reasons:

- `"${SHELL:-/bin/sh}"`: Uses the user's configured/login shell (e.g. `zsh`, `bash`), falling back to `/bin/sh` if `SHELL` is unset. Quoted to handle paths containing spaces.
- `-i`: Forces the shell to be interactive. Ensures that the shell's `*rc` file (e.g. `.zshrc`, `.bashrc`) is loaded.
- `-c`: Takes the first argument as a command to execute.
