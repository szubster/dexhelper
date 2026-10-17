---
id: adr-675-676-cloudflare-monorepo-functions
type: ADR
title: Cloudflare Pages Functions Structure in pnpm Monorepo
status: ACTIVE
owner_persona: architect
created_at: '2026-10-10'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: '3512910946165607263'
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
- [ ] Evaluate the options and decide on the best approach for managing Cloudflare Functions in the monorepo.
- [ ] Document the chosen solution and provide configuration instructions for \`wrangler.toml\` and GitHub Actions.
