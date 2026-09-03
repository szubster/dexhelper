---
id: epic-519-526-extract-core-domain
type: EPIC
title: "Phase 3 - Extract Core Domain Logic & Parsers"
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

# Phase 3 - Extract Core Domain Logic & Parsers

This epic focuses on isolating domain logic, game constants, and save file parsers into the `packages/core` directory.

## Objectives
- Move pure JS/TS logic, game constants, and save file parsers into `@dexhelper/core`.
- Ensure strict zero DOM, React, or browser-specific dependencies in this package.

## Acceptance Criteria
- [ ] Break this epic down into stories for core extraction and parser relocation.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification
