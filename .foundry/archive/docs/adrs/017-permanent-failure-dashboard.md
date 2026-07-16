---
id: adr-017-permanent-failure-dashboard
type: ADR
title: 'ADR 017: Permanent Failure Dashboard & State Synchronization Architecture'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-22'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 017: Permanent Failure Dashboard & State Synchronization Architecture

## Date
2026-05-22

## Status
Accepted

## Context
As the Foundry scales, certain tasks (e.g., `task-062-100-gen3-locations-script-impl.md`) reach their Max Rejection Count and fail permanently, entering an "Impossible Loop" where the parent node must be awakened. Currently, the team lacks visibility into these permanently failed nodes, making it difficult for the Tech Lead or Product Manager to identify deadlocks and spawn necessary `RESEARCH` nodes to resolve them.
To address this, we need to introduce a "Permanent Failures" view within the DAG Dashboard.

## Decision

1. **Dashboard UI Integration**:
   - We will introduce a new filter/view mode in the existing DAG Dashboard (built on React Flow, ADR 008, and Kanban Board, ADR 013).
   - This view will explicitly highlight nodes that have `status: FAILED` and `rejection_count >= MAX_REJECTION_THRESHOLD`.

2. **State Synchronization Architecture**:
   - The Permanent Failure Dashboard will consume the same shared raw parsed DAG data as the React Flow DAG visualizer and Kanban Board, adhering to the single source of truth principle (ADR 013).
   - During the DAG data parsing layer (which reads `.foundry` markdown files), we will extract and expose the `rejection_count` frontmatter field alongside the existing `status` and `id` properties.
   - The shared React Context will be updated to broadcast this new `rejection_count` property to all connected dashboard views.
   - The Permanent Failure view will derive its list by filtering the shared node context for nodes matching the failure criteria, meaning no new persistent state stores or separate data fetching pipelines are required.

## Consequences
- **Positive**: Provides immediate visibility into system deadlocks without requiring manual inspection of repository files.
- **Positive**: Adheres to existing architectural patterns (Shared Context, Single Source of Truth) minimizing added complexity.
- **Constraints**: The parser must be updated to correctly extract the `rejection_count` and pass it to the UI layer.
