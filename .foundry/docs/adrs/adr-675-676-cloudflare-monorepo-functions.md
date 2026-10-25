---
id: adr-675-676-cloudflare-monorepo-functions
type: ADR
title: Cloudflare Pages Functions Structure in pnpm Monorepo
status: COMPLETED
owner_persona: architect
created_at: '2026-10-10'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: research-157-675-cloudflare-regression-analysis
tags:
  - architecture
  - monorepo
  - cloudflare
  - functions
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# ADR: Cloudflare Pages Functions Structure in pnpm Monorepo

## Context
The project is migrating to a pnpm workspace monorepo (\`idea-157\`). As part of this migration, frontend code will reside in \`apps/web\` and backend functions in \`apps/functions\`. However, Cloudflare Pages expects the \`functions/\` directory to be located relative to the designated Root Directory in the Cloudflare dashboard. If the Root Directory is set to \`apps/web\`, Cloudflare will look for \`apps/web/functions/\`, ignoring \`apps/functions/\`.

## Decision Required
We need to establish a standard pattern for handling Cloudflare Pages functions within our monorepo architecture to ensure the existing sync backend continues to work seamlessly.

## Proposed Options
1. **Move functions into the web app:** Place the \`functions/\` directory directly inside \`apps/web/functions\`. This aligns with Cloudflare Pages' default behavior but mixes backend and frontend code in the same workspace package.
2. **Build-step injection:** Keep \`apps/functions\` as a separate workspace package. Create a pre-build or post-build script in \`apps/web\` that copies the contents of \`apps/functions\` into \`apps/web/functions\` or \`apps/web/dist/_worker.js\` before deployment.

## Acceptance Criteria
- [x] Evaluate the options and decide on the best approach for managing Cloudflare Functions in the monorepo.
- [x] Document the chosen solution and provide configuration instructions for \`wrangler.toml\` and GitHub Actions.

## Decision
We will proceed with **Option 2: Build-step injection**.

Keeping `apps/functions` as a separate workspace package ensures a clean separation of concerns and prevents mixing backend Cloudflare dependencies (e.g., `@cloudflare/workers-types`) with frontend dependencies.

### Configuration Instructions

**1. Workspace Build Script:**
Create a post-build or pre-deploy step in the `apps/web` package to copy the `apps/functions` directory into the web app's root just before Cloudflare Pages deployment.

```json
{
  "scripts": {
    "build": "vite build && npm run copy-functions",
    "copy-functions": "cp -r ../functions ./functions"
  }
}
```

**2. `wrangler.toml`:**
Cloudflare Pages automatically detects the `functions/` directory relative to the project root. Since the build step copies it into the web root, no path overriding is necessary in `wrangler.toml`.

**3. GitHub Actions (`.github/workflows/deploy.yml`):**
Ensure the deployment action runs from the `apps/web` directory and executes the `build` script before the `actions/upload-pages-artifact` step.
