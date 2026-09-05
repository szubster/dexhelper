---
id: epic-519-528-isolate-backend-frontend
type: EPIC
title: "Phase 5 - Isolate Backend Functions & Frontend App"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-09-03"
updated_at: "2026-09-03"
depends_on: ["epic-519-526-extract-core-domain","epic-519-527-extract-ui-components"]
jules_session_id: null
pr_number: null
parent: prd-157-519-pnpm-workspaces-architecture
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Phase 5 - Isolate Backend Functions & Frontend App

This epic focuses on separating the main frontend application and backend serverless handlers.

## Objectives
- Move Cloudflare functions (API routes, auth, R2 cloud sync) to `apps/functions`.
- Move the main Vite application to `apps/web`.
- Ensure strict backend isolation and correct dependency linkage using `workspace:*`.

## Acceptance Criteria
- [ ] Break this epic down into stories for web and functions isolation.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification
