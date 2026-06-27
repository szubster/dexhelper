---
id: task-000-212-tpm-sweep-cancelled-nodes-impl
type: TASK
title: Update TPM Sweep Script for CANCELLED Nodes
status: READY
owner_persona: coder
created_at: 2026-06-15T00:00:00.000Z
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - tpm
  - cleanup
  - scripts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update TPM Sweep Script for CANCELLED Nodes

## Context
Currently, the TPM's active node sweeping script (`.github/scripts/sweep-active-nodes.ts`) only archives nodes that are in the `COMPLETED` state. Over time, nodes that reach their maximum rejection threshold or are manually retired transition to `CANCELLED` status and clutter the `.foundry` directories.

## Objective
Update the `sweep-active-nodes.ts` script to also sweep and archive nodes that are in the `CANCELLED` state.

## Implementation Details
1. Modify `.github/scripts/sweep-active-nodes.ts` to identify both `COMPLETED` and `CANCELLED` nodes.
2. Update the logic that moves files to ensure `CANCELLED` nodes are moved to the corresponding directory in `.foundry/archive/` (e.g., from `.foundry/tasks/` to `.foundry/archive/tasks/`).
3. Update any relevant unit tests (e.g., `sweep-active-nodes.test.ts`) to cover `CANCELLED` nodes.

## Acceptance Criteria
- [ ] The `sweep-active-nodes.ts` script successfully identifies and archives `CANCELLED` nodes.
- [ ] Existing functionality for sweeping `COMPLETED` nodes remains intact.
- [ ] Unit tests are updated and all pass.
