---
id: task-270-330-rng-tid-sid-integration-qa
type: TASK
title: RNG TID and SID UI Integration QA
status: READY
owner_persona: qa
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on:
  - task-270-329-rng-tid-sid-integration-impl
jules_session_id: null
pr_number: null
parent: story-130-270-rng-tid-sid-integration
tags:
  - ui
  - feature
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RNG TID and SID UI Integration QA

## Objective
Verify that the `RngTidSidDisplay` component is properly integrated and displaying in the dashboard view when `secretId` is available in `saveData`.

## Acceptance Criteria
- [ ] Verify `RngTidSidDisplay` renders in `src/routes/dashboard.tsx` when `saveData.secretId` is present.
- [ ] Verify `RngTidSidDisplay` receives the correct `tid` and `sid` props from `saveData`.
- [ ] Ensure that `RngTidSidDisplay` does not render or handles it gracefully if `secretId` is missing (e.g. Gen 1/2 saves or old saves).
- [ ] Verify tests pass.

## Contracts
- **QA**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **QA**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **QA**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
