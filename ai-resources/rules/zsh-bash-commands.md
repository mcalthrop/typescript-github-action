# Running Commands with the `bash` shell

When running commands in the `bash` shell:

```sh
zsh -i -c "..."
```

Reasons:

- `-i`: Forces shell to be interactive. Ensures that the `.zshrc` file is loaded.
- `-c`: Takes the first argument as a command to execute.
