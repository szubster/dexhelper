## 2026-04-19 - Removed BundleMon
**Learning:** Replaced BundleMon with `@codecov/vite-plugin` for bundle analysis since bundle size monitoring is already handled alongside test coverage. BundleMon is redundant and creates overlapping concerns.

## 2026-04-19 - Restored BundleMon
**Learning:** User prefers to keep BundleMon alongside `@codecov/vite-plugin`. BundleMon is explicitly maintained despite overlapping with `@codecov/vite-plugin` per user request.
## 2026-04-19 - Rejected tsc-files
**Learning:** Evaluated using `tsc-files` in the pre-commit hook (`lefthook.yml`) to speed up type-checking by targeting only staged files instead of running `pnpm lint` (which does a full project type-check). User rejected this change because the tradeoff of potentially missing compilation failures in unstaged files that depend on the staged files is not acceptable. The full type check in pre-commit remains to ensure local safety.
## 2026-04-20 - Implemented Vite Manual Chunking Strategy
**Learning:** Separating `node_modules` dependencies into distinct manual chunks (e.g., `vendor-react`, `vendor-tanstack`, `vendor-lucide`) in `vite.config.ts` significantly improves browser caching behavior. Instead of one massive index chunk that invalidates entirely whenever app code changes, stable libraries can remain cached in user browsers, leading to faster load times on subsequent visits.
