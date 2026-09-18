---
id: task-560-569-gen3-match-call-static-data-e2e-qa
type: TASK
title: 'QA Verify: Gen 3 Match Call Static Data E2E Tests'
status: ACTIVE
owner_persona: qa
created_at: '2026-09-08'
updated_at: '2026-09-18'
depends_on:
  - task-560-568-gen3-match-call-static-data-e2e-coder
jules_session_id: '5554832121806847116'
pr_number: null
parent: story-084-560-gen3-match-call-static-data-e2e
tags:
  - e2e
  - integration
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verify: Gen 3 Match Call Static Data E2E Tests

## Description
Verify the E2E testing implementation for the Gen 3 Match Call static dataset generation pipeline.

## Context
Ensure that the coder correctly implemented the Playwright E2E tests verifying MsgPack export and IndexedDB hydration (`PokeDB.ts`) for Match Call static data.

## Acceptance Criteria
- [x] Run the specifically affected Playwright E2E test file locally (e.g. `xvfb-run -a pnpm test:e2e <target_file>`) and verify it passes.
- [x] Ensure the tests properly verify MsgPack export and IndexedDB hydration.
