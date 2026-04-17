# Conventional Commits

Always write commit messages following the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

## Format

```txt
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Use when |
| ------ | ---------- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. — no logic change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependency, or tooling changes |
| `ci` | CI/CD configuration changes |
| `perf` | Performance improvements |
| `revert` | Reverts a previous commit |

## Rules

- The description must be lowercase and not end with a period.
- Use the imperative mood in the description (e.g. "add feature" not "added feature").
- Keep the description under 72 characters.
- Add a scope in parentheses after the type when it helps clarify the area of change, e.g. `feat(auth): add OAuth2 support`.
- Mark breaking changes with `!` after the type/scope, e.g. `feat!: remove deprecated endpoint`, and include a `BREAKING CHANGE:` footer.

## Examples

```txt
feat(auth): add OAuth2 login support
fix: prevent crash when config file is missing
docs: update installation instructions
chore(deps): upgrade vitest to v2
refactor(api): extract response normalisation to helper
test(checkout): add edge case for empty cart
feat!: remove legacy REST endpoint

BREAKING CHANGE: the /v1/users endpoint has been removed; use /v2/users instead
```
