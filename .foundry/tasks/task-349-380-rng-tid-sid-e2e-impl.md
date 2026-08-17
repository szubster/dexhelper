---
id: task-349-380-rng-tid-sid-e2e-impl
type: TASK
title: Implement E2E Tests for RNG TID and SID Display UI
status: ACTIVE
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '12794376188467415866'
pr_number: null
parent: story-130-349-rng-tid-sid-e2e
tags:
  - e2e
  - rng
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Implement E2E Tests for RNG TID and SID Display UI

## Objective
Write end-to-end tests for the RNG TID and SID Display UI to ensure it is functioning as expected in the Trainer dashboard, particularly that the correct TID and SID are displayed and that the copy-to-clipboard functionality works.

## Contract & Guidelines
- Write Playwright E2E tests for the RNG TID and SID display in the Trainer dashboard.
- Verify that the correct TID and SID are displayed in the UI when a save file is loaded.
- Verify the copy-to-clipboard functionality for both TID and SID works correctly.
- If this involves save file parsing or extraction in any capacity (e.g. constructing mock saves), you MUST strictly adhere to all guidelines defined in Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Coder: Write E2E test to verify that the Trainer dashboard correctly displays the RNG TID.
- [ ] Coder: Write E2E test to verify that the Trainer dashboard correctly displays the RNG SID.
- [ ] Coder: Write E2E test to verify that the copy-to-clipboard buttons for TID and SID function correctly.
