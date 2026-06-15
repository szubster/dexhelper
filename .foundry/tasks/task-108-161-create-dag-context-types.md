---
id: task-108-161-create-dag-context-types
type: TASK
title: Create DagContext Interfaces and Types
status: READY
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-create-dag-context-interfaces
tags:
  - architecture
  - ui
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Create DagContext Interfaces and Types

## Overview
Define the TypeScript interfaces and types for the `DagContext`. The board needs to maintain a shared state between the React Flow visualizer and the Kanban board according to ADR 013 and ADR 017.

## Architectural Scaffolding
Following ADR 013 and ADR 017:
- The `DagContext` should be defined first before implementing UI components to prevent tight coupling.
- The context must hold the raw parsed DAG data (nodes, edges).
- Nodes must explicitly include the `rejection_count` property to support the Permanent Failure Dashboard logic in the future.

## Acceptance Criteria
- [ ] Create `DagContext` types file (e.g. `src/components/dashboard/DagContext.tsx` or similar central place).
- [ ] Define the shape of the node data, including fields like `id`, `status`, `owner_persona`, `depends_on`, and explicitly `rejection_count`.
- [ ] Define the context state shape (nodes list, edges list, potentially loading states or currently selected view).
- [ ] Ensure the Coder and QA personas are explicitly reminded: if they abort or permanently fail a task, they MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- [ ] Ensure the Coder and QA personas are explicitly reminded: if they submit an empty PR for a completed task, they MUST check off all Acceptance Criteria checkboxes before submitting.
