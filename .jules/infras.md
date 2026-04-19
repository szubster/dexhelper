## 2026-04-19 - Removed BundleMon
**Learning:** Replaced BundleMon with `@codecov/vite-plugin` for bundle analysis since bundle size monitoring is already handled alongside test coverage. BundleMon is redundant and creates overlapping concerns.

## 2026-04-19 - Restored BundleMon
**Learning:** User prefers to keep BundleMon alongside `@codecov/vite-plugin`. BundleMon is explicitly maintained despite overlapping with `@codecov/vite-plugin` per user request.
## 2026-04-19 - Added tsc-files to pre-commit hook\n**Learning:** The project uses `tsc-files` in its `lefthook.yml` pre-commit hook to speed up TypeScript type checking by targeting only staged files (`pnpm exec tsc-files --noEmit {staged_files}`) instead of running a full project type check. This improves the developer experience by providing faster feedback before commits.
