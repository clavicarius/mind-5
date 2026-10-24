# Tests

Mind 5 currently serves a static landing page. Its smoke tests use Node.js's
built-in test runner and do not require installing dependencies.

## Run locally

Install Node.js 22 or newer, then run from the repository root:

```sh
npm test
```

The tests check the landing page's language, title, main content and navigation
landmarks, and verify that its logo has alternative text and points to an
existing local image.

GitHub Actions runs the same command for pull requests targeting `main` and
when changes are pushed to `main`.
