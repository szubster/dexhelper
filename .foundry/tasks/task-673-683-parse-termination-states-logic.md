---
id: task-673-683-parse-termination-states-logic
type: TASK
title: Implement Orchestrator Termination State Parsing Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-10-13'
updated_at: '2026-10-20'
depends_on: []
jules_session_id: null
parent: story-581-673-orchestrator-termination-state-parsing
tags:
  - orchestrator
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Orchestrator Termination State Parsing Logic

## Objective
Update the DAG Orchestrator to parse termination states and differentiate between infrastructure errors and domain rejections.

## Details
- In `packages/foundry/foundry-orchestrator.ts` Phase 3.0 (MAX REJECTION THRESHOLD CHECK), inspect the `rejection_reason` from the frontmatter.
- Check if the `rejection_reason` matches patterns like `Session terminated with state: NOT_FOUND` or `Session terminated with state: INTERNAL_ERROR`.
- If it is an infrastructure error (e.g., `NOT_FOUND`, `INTERNAL_ERROR`), skip incrementing towards the max rejection threshold.
- Update internal tracking and logging to accurately classify and report these failures rather than grouping them under a generic "Max rejection count reached" domain failure.
