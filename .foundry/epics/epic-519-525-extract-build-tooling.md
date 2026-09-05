---
id: epic-519-525-extract-build-tooling
type: EPIC
title: "Phase 2 - Extract Build Tooling & Data Pipelines"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-09-03"
updated_at: "2026-09-03"
depends_on: ["epic-519-524-workspace-infrastructure"]
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

# Phase 2 - Extract Build Tooling & Data Pipelines

This epic focuses on isolating build tooling and data pipelines into the `tools/` directory.

## Objectives
- Isolate Vite plugins into `@dexhelper/vite-plugins`.
- Extract data generation scripts into `@dexhelper/pokedata-extractor`.
- Relocate `.github/scripts/` into `@dexhelper/foundry`.

## Acceptance Criteria
- [ ] Break this epic down into stories for each tooling package.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification
