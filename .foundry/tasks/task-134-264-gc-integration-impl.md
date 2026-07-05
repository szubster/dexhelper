---
id: task-134-264-gc-integration-impl
type: TASK
title: Garbage Collection Integration Logic (Impl)
status: PENDING
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-090-134-garbage-collection-integration
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Garbage Collection Integration Logic (Impl)

## Objective
Integrate the GC process into the main orchestrator (foundry-heartbeat.ts) or as a separate scheduled script to correctly process remediated nodes.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Determine integration approach (synchronous vs scheduled script).
- [ ] Implement the integration using the detection and remediation logic.
- [ ] Write tests to verify the integration.
