---
id: epic-516-530-replace-xyflow-core
type: EPIC
title: Replace xyflow with a lightweight DAG tree component
status: PENDING
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
parent: prd-418-516-replace-xyflow-with-custom-dag
tags:
  - performance
  - bundle-size
  - ui-ux
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Replace xyflow with a lightweight DAG tree component

## Objective
Implement a lightweight, DOM-based directory tree visualization for the Foundry DAG to replace the heavy `@xyflow/react` dependency.

## Scope
1. Implement `DagTree` UI component using standard nested `<ul>`/`<li>` structure.
2. Integrate expand/collapse toggles and "Expand All" / "Collapse All" functionality.
3. Apply tactical hardware aesthetics (sharp edges, dashed borders, monospaced font) following ADR 008.
4. Remove `@xyflow/react`, `dagre`, and associated chunking configurations from the build.
5. Provide Integration and E2E Verification of the new DagTree.

## Acceptance Criteria
- [ ] Implement `DagTree` UI logic.
- [ ] Implement dependencies and Vite configuration cleanup.
- [ ] Implement E2E testing layer for verification.
- [ ] story-530-536-dagtree-ui-logic
- [ ] story-530-537-xyflow-cleanup
- [ ] story-530-538-dagtree-e2e-verification
