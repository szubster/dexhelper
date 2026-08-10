---
id: task-356-397-gen2-static-encounters-e2e-qa
type: TASK
title: QA Gen 2 Static Encounters E2E Tests
status: ACTIVE
owner_persona: qa
created_at: '2026-08-04T00:00:00.000Z'
updated_at: '2026-08-10'
depends_on:
  - task-356-396-gen2-static-encounters-e2e-impl
jules_session_id: '10584594702360912293'
pr_number: null
parent: story-137-356-gen2-static-encounters-e2e
tags:
  - gen2
  - e2e
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 Static Encounters E2E Tests

Verify the end-to-end tests for the Gen 2 static encounters checklist to ensure they correctly test that event flags are parsed correctly and the UI displays the correct state for Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia.

## Acceptance Criteria
- [ ] Verify Playwright E2E tests correctly test Gen 2 static encounters
- [ ] Verify tests use real save fixtures from `tests/fixtures`
- [ ] Verify tests hydrate app state using `initializeWithSave(page)` from `tests/e2e/test-utils.ts`
- [ ] Verify tests call `await waitForSync(page)` after navigation to ensure IndexedDB sync completes
- [ ] Verify save file parsing strictly adheres to all guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`
