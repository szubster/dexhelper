---
id: task-065-114-wire-up-data-layer-impl
type: TASK
title: Implement DAG data fetching
status: ACTIVE
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: '6083864211428589312'
pr_number: null
parent: story-029-065-wire-up-data-layer
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement DAG data fetching

This task requires checking and completing the implementation of fetching the actual `.foundry` DAG data for the React Flow DAG Dashboard.

## Acceptance Criteria
- [ ] Confirm `src/components/dag/DagDashboard.tsx` fetches `import.meta.env.BASE_URL + "data/foundry.json"`.
- [ ] Ensure that `buildDagGraph` from `src/utils/dag/builder.ts` correctly parses this response.
- [ ] Map the parsed nodes and edges to the React Flow layout state.
