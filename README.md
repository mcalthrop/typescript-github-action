# TypeScript GitHub action example

This repository demonstrates how to write and test a GitHub action in TypeScript.

## Problem statement

Automated testing of code has become the norm. However, there seems to have been very little movement towards testing pipeline code.

Pipeline code can quickly become complex, and all of that complexity is untested and untestable.

For example, with GitHub actions, how many times have you seen...

- 20-30 lines of bash scripts in a GitHub action?
- actions and workflows that are 100+ lines long?
- several levels of nested GitHub actions?

All untested and untestable.

## Solution

In the case of GitHub actions, we can make use of the [GitHub Actions Toolkit](https://github.com/actions/toolkit#readme) libraries to write and test our actions.

We can do the following:

- read and validate action inputs
- write and test the action logic
- write and test reusable utilities that would normally be defined in an individual GitHub action
- write action outputs

## This repository

This repository contains an example of a GitHub action that manages labels on a pull request.

It defines a reusable action that does the following:

- accepts a comma-separated list of labels to add and remove
- adds the specified labels to the pull request
- removes the specified labels from the pull request
- writes an output that contains a markdown message describing the labels that were added and removed

Key places to look:

- `.github/actions/manage-github-labels/action.yml`: defines the action inputs and outputs
- `.github/workflows/validate-pr.yml`: uses the action to add labels to a pull request
- `.github/workflows/merge-pr.yml`: uses the action to remove labels from a pull request
- `src/index.ts`: defines the action inputs schema and executes the action
- `src/action.ts`: contains the action logic
- `src/common`: contains reusable utilities

## Local development

### Preparation

Install the version of `pnpm` specified in the `engines.pnpm` field of `package.json`:
https://pnpm.io/installation#installing-a-specific-version

Install `nvm`:
https://github.com/nvm-sh/nvm#readme

### Setup

```sh
nvm install
```

```sh
pnpm install
```

### Tasks

See the `scripts` section of `package.json` for tasks you can run, such as linting, formatting, and testing.
