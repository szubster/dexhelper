---
id: story-338-336-implement-orchestrator-cycle-detection
type: STORY
title: 'Story: Implement Orchestrator Cycle Detection'
status: READY
owner_persona: tech_lead
created_at: '2026-07-26'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
parent: epic-334-338-circular-dependency-detection
tags:
  - foundry
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Story: Implement Orchestrator Cycle Detection

## Overview
Implement robust circular dependency detection during the MAP or RESOLVE phases of the DAG orchestrator execution in `.github/scripts/foundry-orchestrator.ts`. The orchestrator must properly evaluate all `PENDING` nodes and their `depends_on` relationships to detect cycles (e.g., using a topological sort or DFS with a recursion stack).

## Acceptance Criteria
- [x] Orchestrator detects circular dependencies and transitions involved nodes to `FAILED`.
- [x] Descriptive `rejection_reason` (e.g., "Circular dependency detected") is appended in the frontmatter of failed nodes.
- [x] Running orchestrator in `--dry-run` or `--strict` modes outputs explicit warnings/error logs detailing the detected cycle.

### Generated Tasks
- [ ] task-336-388-implement-orchestrator-cycle-detection
- [ ] task-336-389-orchestrator-cycle-detection-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
