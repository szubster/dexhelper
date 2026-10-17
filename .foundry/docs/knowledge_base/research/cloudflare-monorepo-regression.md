# Cloudflare Monorepo Regression Analysis

## Findings
The migration to a pnpm workspace structure (`idea-157`) introduces several configuration changes that impact the existing Cloudflare server-side sync setup:

1. **Functions Directory Restructuring:**
   - The original architecture expected `functions/` to be at the project root for Cloudflare Pages.
   - The monorepo migration proposes moving backend functions to `apps/functions/`.
   - The frontend application is moving to `apps/web/`.
   - **Impact:** Cloudflare Pages expects the `functions/` directory to be located relative to the designated "Root Directory" in the Cloudflare dashboard. If the Root Directory is set to `apps/web` (for frontend builds), Cloudflare Pages will look for `apps/web/functions/` instead of `apps/functions/`.

2. **Wrangler Configuration:**
   - The current `wrangler.toml` in the project root configures the Pages build output directory as `dist` and sets up the `SAVES_BUCKET` R2 binding.
   - When functions are moved to `apps/functions` and the frontend to `apps/web`, this configuration needs to be correctly mapped or updated to ensure the Cloudflare build process correctly attaches the R2 bucket and environment variables to the functions.

3. **Dependency Resolution:**
   - The `apps/functions` directory must correctly resolve its dependencies (e.g., `@cloudflare/workers-types`) within the pnpm workspace context.

## Proposed Action Plan
To maintain backend sync stability without breaking the new monorepo architecture, the following updates are necessary:

1. **Cloudflare Pages Configuration:**
   - Since Cloudflare Pages expects `functions/` to be within the Root Directory, keeping `apps/functions` entirely separate from `apps/web` creates a routing problem for Pages.
   - **Solution 1 (Recommended for Pages):** Maintain the `functions/` directory inside `apps/web/functions/` if the Cloudflare Pages project is strictly deployed from the `apps/web` root directory.
   - **Solution 2 (Advanced Routing):** If `apps/functions` is kept separate, a custom build script is required to copy the contents of `apps/functions/` into the build output directory (`apps/web/dist/` or `dist/`) or into `apps/web/functions/` before the Cloudflare build process finalizes, so Pages can discover them. Alternatively, if deploying via `wrangler pages deploy`, specify the functions directory explicitly.

2. **ADR Proposal:**
   - Create an ADR (Architecture Decision Record) detailing how Cloudflare Pages functions will be structured and built within the `pnpm` monorepo to resolve this directory expectation mismatch.
   - The ADR should decide between placing functions in `apps/web/functions` or using a build step to merge `apps/functions` into the deployment payload.
