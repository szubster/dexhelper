---
id: task-560-570-verify-dag-cancelled-highlighting
type: TASK
title: Verify DAG CANCELLED node highlighting
status: COMPLETED
owner_persona: qa
created_at: '2026-09-14'
updated_at: '2026-09-22'
depends_on:
  - task-560-569-test-dag-cancelled-highlighting
jules_session_id: null
parent: story-530-560-update-dag-ui-components
tags:
  - ui
  - react
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Verify DAG CANCELLED node highlighting

## Objective
Verify the changes made in the implementation and test tasks by ensuring CANCELLED nodes with `rejection_count >= maxRejectionThreshold` are visible in the Permanent Failure Dashboard and are highlighted correctly.

## Acceptance Criteria
- [x] Verify `pnpm lint` and `pnpm test` pass.
- [x] Verify the implementation correctly highlights CANCELLED nodes with high rejection counts as permanent failures.
