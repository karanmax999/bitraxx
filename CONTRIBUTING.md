# Contributing to Bitraxx

We welcome contributions from developers, testers, and writers! By contributing to this project, you help build a safer, faster, and more beautiful token launchpad platform.

Please take a moment to review this document before submitting your pull request.

---

## 📋 Table of Contents
1. [Code Style & Standards](#-code-style--standards)
2. [Git Workflow & PR Process](#-git-workflow--pr-process)
3. [Commit Message Standards](#-commit-message-standards)
4. [Testing Requirements](#-testing-requirements)
5. [Pull Request Checklist](#-pull-request-checklist)

---

## 🎨 Code Style & Standards

To maintain code quality and readability across Next.js and backend modules, we enforce the following rules:

- **Language**: Strict **TypeScript** is required for all frontend and backend components. Avoid utilizing `any` type definitions; define explicit interfaces or schemas instead.
- **Linting & Checkers**: Code must pass all ESLint and compiler checks:
  ```bash
  # Check for TypeScript compiler errors
  pnpm check

  # Check for linting anomalies
  pnpm lint
  ```
- **Formatting**: We use Prettier to enforce consistent code layouts. Format your files before committing:
  ```bash
  pnpm format
  ```
- **CSS / Styling**: Style elements using Tailwind utility classes combined with custom, premium glassmorphism classes configured under `globals.css`. Ensure UI components support standard responsive styling across both mobile and desktop viewports.

---

## 🔄 Git Workflow & PR Process

We use a feature-branch workflow to merge updates into our core repositories:

### 1. Fork the Repository
Fork the Bitraxx repository on GitHub and clone it locally:
```bash
git clone https://github.com/your-username/brx-launchpad.git
cd brx-launchpad
```

### 2. Configure Upstream
Add the parent repository as the upstream remote to sync updates:
```bash
git remote add upstream https://github.com/bitraxx/brx-launchpad.git
```

### 3. Create a Feature Branch
Create a targeted branch named cleanly following the features you are developing (e.g. `feature/`, `fix/`, `docs/`, `refactor/`):
```bash
# Keep master up-to-date
git checkout master
git pull upstream master

# Create a new feature branch
git checkout -b feature/wallet-disconnect-button
```

### 4. Code & Local Checks
Develop your features, write corresponding tests (see [Testing](#-testing-requirements)), and run local checks:
```bash
pnpm lint
pnpm test
```

### 5. Commit Changes
Ensure your commits are structured logically. Break down massive changes into distinct, bite-sized commits:
```bash
git add .
git commit -m "feat: add wallet disconnect button to investor dashboard"
```

### 6. Push & Submit PR
Push changes to your fork and submit a Pull Request to the Bitraxx upstream `master` branch:
```bash
git push origin feature/wallet-disconnect-button
```

---

## 💬 Commit Message Standards

We enforce **Conventional Commits** to auto-generate clean changelogs and maintain structured git histories. Commits must be prefixed with one of the following category identifiers:

- **`feat:`** - Introducing a new feature or endpoint (e.g. `feat: implement kyc admin rejection drawer`).
- **`fix:`** - Fixing an active bug or compiler issue (e.g. `fix: patch S3 signed url file uploads`).
- **`docs:`** - Documentation-only adjustments (e.g. `docs: add environment variable descriptions`).
- **`test:`** - Appending new tests or correcting existing test suites (e.g. `test: add routers.purchases unit tests`).
- **`refactor:`** - Optimizing code layout without changing behavioral outcomes (e.g. `refactor: extract wallet address validators`).
- **`style:`** - Formatting, visual updates, missing semicolons, or minor layout details.
- **`chore:`** - Lockfiles, configuration updates, package installations, or builds (e.g. `chore: upgrade viem to v2`).

---

## 🧪 Testing Requirements

We prioritize platform security and stability. If your PR introduces new endpoints, database schemas, or complex logic, you **must** write unit or integration tests:

- **Test Framework**: [Vitest](https://vitest.dev)
- **Directory**: Test targets must be located inside the server folder using naming conventions matching `*.test.ts`.
- **Target Coverage**: We aim to maintain a minimum of **80% code coverage** for critical financial pathways (purchases, referrals, and admin procedures).

To execute tests locally:
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

---

## ✅ Pull Request Checklist

Before submitting your PR, double-check that you can check off every item on this list:

- [ ] All code is written in strict TypeScript without any compiler errors.
- [ ] Code passes all linter checks by running `pnpm lint`.
- [ ] Code has been formatted using `pnpm format`.
- [ ] Relevant unit/integration tests have been added to verify your changes.
- [ ] All tests pass successfully by running `pnpm test`.
- [ ] Your commit messages comply with the Conventional Commits specification.
- [ ] You have updated the documentation (README, SECURITY, etc.) if your changes include new configuration keys or APIs.

Thank you for contributing to Bitraxx! Your support makes our launchpad platform exceptional.
