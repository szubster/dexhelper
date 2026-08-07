---
id: task-356-396-gen2-static-encounters-e2e-impl
type: TASK
title: Implement Gen 2 Static Encounters E2E Tests
status: READY
owner_persona: coder
created_at: '2026-08-04T00:00:00.000Z'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: null
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

# Implement Gen 2 Static Encounters E2E Tests

Create end-to-end tests using Playwright for the Gen 2 static encounters checklist to ensure that event flags are parsed correctly and the UI displays the correct state for Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia.

## Acceptance Criteria
- [ ] Create Playwright E2E tests for Gen 2 static encounters
- [ ] Use real save fixtures from `tests/fixtures`
- [ ] Hydrate app state using `initializeWithSave(page)` from `tests/e2e/test-utils.ts`
- [ ] Always call `await waitForSync(page)` after navigation to ensure IndexedDB sync completes
- [ ] Strictly adhere to all guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md` for save file parsing.
