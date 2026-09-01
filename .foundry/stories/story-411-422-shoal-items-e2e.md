---
id: story-411-422-shoal-items-e2e
type: STORY
title: E2E Integration Verification for Shoal Items
status: READY
owner_persona: tech_lead
created_at: '2026-08-13'
updated_at: '2026-09-01'
depends_on:
  - story-411-421-shoal-items-parsing
jules_session_id: null
pr_number: null
parent: epic-340-411-shoal-cave-data-extraction
tags:
  - story
  - gen3
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: E2E Integration Verification for Shoal Items

## Description
This story focuses on verifying that the Shoal Items (Shoal Salt and Shoal Shells) extraction logic is correctly integrated and functions end-to-end within the broader application flow.

## Requirements
1.  **E2E Tests:**
    *   Create Playwright E2E tests to verify that a Gen 3 save file containing Shoal items is correctly loaded and parsed.
    *   The test must ensure that the Shoal item counts are accurately extracted and accessible by downstream systems or components (even if the UI isn't fully implemented yet, the data flow must be verified).

## Acceptance Criteria
- [ ] Implement Playwright E2E tests for Shoal items parsing.
- [ ] Ensure tests cover loading a mock/fixture save file with Shoal items.
- [x] Break down into Tasks
- [ ] task-422-469-shoal-items-e2e-impl
