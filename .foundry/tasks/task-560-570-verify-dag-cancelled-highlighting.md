---
id: task-560-570-verify-dag-cancelled-highlighting
type: TASK
title: Verify DAG CANCELLED node highlighting
status: PENDING
owner_persona: qa
parent: story-530-560-update-dag-ui-components
depends_on: [task-560-569-test-dag-cancelled-highlighting]
tags: [ui, react, qa]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Verify DAG CANCELLED node highlighting

## Objective
Verify the changes made in the implementation and test tasks by ensuring CANCELLED nodes with `rejection_count >= maxRejectionThreshold` are visible in the Permanent Failure Dashboard and are highlighted correctly.

## Acceptance Criteria
- [ ] Verify `pnpm lint` and `pnpm test` pass.
- [ ] Verify the implementation correctly highlights CANCELLED nodes with high rejection counts as permanent failures.
