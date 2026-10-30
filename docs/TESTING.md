# Tests

Mind 5 includes a browser-based game shell. Its tests use Node.js's built-in
test runner and do not require installing dependencies.

## Run locally

Install Node.js 22 or newer, then run from the repository root:

```sh
npm test
```

The tests check the page landmarks and logo, the age groups and six exact
difficulty profiles, five-task round composition, daily score calculation,
Berlin calendar dates, selectable answers, and Memory Logic content and scoring.

GitHub Actions runs the same command for pull requests targeting `main` and
when changes are pushed to `main`.
