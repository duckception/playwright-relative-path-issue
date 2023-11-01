# Playwright Relative Path Issue Reproduction Repo

### Steps to reproduce 🚶‍♂️

1. Install dependencies: `pnpm install`.
2. Compile the `test/e2e/pom` directory: `pnpm run compile`.
3. Run the import test: `pnpm run import:test`.

### Expected behavior 🤔

The import test should run successfully.

### Actual behavior 😬

The import test fails with the following error:
```
Error: Cannot find module '../package.json'
```

### Test the fix 🧪

1. Install dependencies: `pnpm install`.
2. Compile the `test/e2e/pom` directory: `pnpm run compile:fix`.
3. Run the import test: `pnpm run import:test`.

#### Result ✅

The import test runs successfully.

### Explanation 📖

The import test fails due to [this line in Playwright](https://github.com/microsoft/playwright/blob/d983941447d7b19b7fac4e9a28d296186ec02b82/packages/playwright/src/index.ts#L33).

The line in question:
```ts
addInternalStackPrefix(path.dirname(require.resolve('../package.json')));
```

Playwright in this line uses a relative path to resolve the dirname of the package. 
This line with relative path is added to any compiled file that imports something from the `@playwright/test` file, for example `import { Page } from '@playwright/test'`.
If we don't provide the `package.json` file that resolves to the relative path, the import of the compiled file fails.

Adding a patch (see `src/compileWithFix.ts`) on top of the compiled file that resolves the relative path issue is okay in the short term, but it's not a good long term solution.
This should be addressed in the Playwright codebase.
