---
id: epic-045-070-implement-dag-context
type: EPIC
title: Implement DagContext and Provider for DAG Data
status: READY
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-073-045-refactor-dag-dashboard-context
tags:
  - architecture
  - ui
  - dashboard
  - context
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement DagContext and Provider for DAG Data

## Overview
As per ADR 013 and ADR 017, the core DAG data state must be lifted into a shared React Context to serve as a single source of truth for both the Graph View (React Flow) and the upcoming Kanban Board and Permanent Failure Dashboard.

## Requirements
- Create `DagContext` to manage the core DAG data state (nodes, edges).
- Implement `DagProvider` to wrap the DAG views.
- The context should expose the parsed DAG data.
- Ensure the state structure is designed to support the upcoming Kanban Board and Permanent Failure Dashboard requirements.

## Acceptance Criteria
- [x] Break down into Stories
- [x] .foundry/archive/stories/story-070-108-create-dag-context-interfaces.md
- [x] .foundry/archive/stories/story-070-109-implement-dag-provider.md
- [x] .foundry/archive/stories/story-070-245-implement-dag-provider-state-management.md

### Auditor Rejection
The generated artifacts do not meet the Acceptance Criteria of the Epic. While DagContext and DagProvider were created, DagProvider does not actually manage the core DAG data state (nodes, edges) by fetching it, nor does it wrap the DAG views. This work was improperly deferred to story-046-120. The Epic cannot be verified until the provider fully manages and provides the state as originally required.
