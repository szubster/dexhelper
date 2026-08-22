---
id: task-412-440-feebas-parsing-e2e-impl
type: TASK
title: Feebas Parsing E2E Integration Impl
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '2679283346936413387'
pr_number: null
parent: story-058-412-feebas-parsing-e2e
tags:
  - gen3
  - backend
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Feebas Parsing E2E Integration

## Context
In Generation 3, Feebas tiles are dynamically generated based on a hidden seed (derived from the Dewford Town trendy phrase). The backend parsing engine successfully extracts this seed and correctly computes the tile coordinates using the LCG formula.

As part of the Orchestrator Safeguard (E2E/Integration Requirement), we need dedicated end-to-end (E2E) tests in Playwright to verify that parsing different `.sav` files correctly visualizes these tiles.

## Objective
Write Playwright E2E tests to verify that uploading a Gen 3 save file correctly extracts the Feebas seed, parses it to 6 spot IDs, and displays them as locations within the UI.

## Acceptance Criteria
- [ ] Create Playwright E2E tests to verify the Feebas data parsing end-to-end.
- [ ] Test multiple Gen 3 saves (if fixtures are available) or mock the File system API to inject known seed values.
- [ ] Ensure tests use correct built-in Playwright locators rather than manually evaluating the DOM (e.g. do NOT use `page.evaluate()`).
- [ ] Verify that UI visually renders the 6 expected tile markers.
