---
id: task-108-161-update-schema-macro-node-completion-impl
type: TASK
title: Implement update to schema.md with strict macro node completion rules
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '12200566423249370066'
pr_number: null
parent: story-071-108-update-schema-macro-node-completion
tags:
  - orchestrator
  - schema
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement update to schema.md with strict macro node completion rules

## Context
With the introduction of strict hierarchical completion in the orchestrator, where macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`, our system documentation needs to reflect these new constraints.

## Objective
Update `.foundry/docs/schema.md` to detail the new macro node completion rules so that all personas are aware of the expected behavior and how to properly format parent-child relationships to comply.

## Requirements
- Update `.foundry/docs/schema.md` to explain the new hierarchical completion rules. Ensure it explicitly states that macro nodes cannot complete until all their descendants are fully completed.

## Contract / Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Intelligent Verification Protocol
- This is a simple/low-risk documentation update. The `coder` is designated to self-verify. Document your self-verification in your task journal.

## Acceptance Criteria
- [x] Update `schema.md` to explain hierarchical completion rules.
