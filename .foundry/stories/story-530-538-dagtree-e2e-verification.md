---
id: story-530-538-dagtree-e2e-verification
type: STORY
title: "Integration and E2E Verification of DagTree"
status: PENDING
owner_persona: "tech_lead"
created_at: "2026-09-05"
updated_at: "2026-09-05"
depends_on:
  - story-530-537-xyflow-cleanup
jules_session_id: null
locks: []
pr_number: null
parent: epic-516-530-replace-xyflow-core
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Story: Integration and E2E Verification of DagTree

## Objective
Verify the integration and functionality of the new lightweight `DagTree` UI component using Playwright E2E tests, ensuring correct replacement of the previous DAG viewer and validating user interactions.

## Scope
1. Update existing DAG UI E2E tests to target the new `DagTree` structure (`<ul>`/`<li>`).
2. Add interactions for expand/collapse toggles and "Expand All"/"Collapse All" buttons.
3. Validate that DAG visualization correctly matches the backend Foundry state.

## Acceptance Criteria
- [ ] Break down into Tasks to write E2E tests.
- [ ] Update Playwright E2E locators for DAG visualization.
- [ ] Ensure all DAG expand/collapse user interactions are covered in tests.
