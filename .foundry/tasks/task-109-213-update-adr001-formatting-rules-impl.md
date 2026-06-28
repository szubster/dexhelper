---
id: task-109-213-update-adr001-formatting-rules-impl
type: TASK
title: Update ADR 001 with parent-child formatting rules for macro nodes
status: ACTIVE
owner_persona: coder
created_at: '2026-06-20'
updated_at: '2026-06-28'
depends_on:
  - task-109-212-update-adr001-macro-node-completion-impl
jules_session_id: '5661755355822684535'
pr_number: null
parent: story-071-109-update-adr001-macro-node-completion
tags:
  - orchestrator
  - adr
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update ADR 001 with parent-child formatting rules for macro nodes

## Context
Macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`. We must update our architectural documentation to instruct personas on how to correctly format these parent-child relationships.

## Objective
Update `.foundry/docs/adrs/001-the-foundry-architecture.md` (ADR 001) to detail how personas must format parent-child relationships to comply with macro node completion constraints.

## Requirements
1. Update `.foundry/docs/adrs/001-the-foundry-architecture.md` (ADR 001), specifically Section 7 ("System Invariants") or a related section, to state the following rules for generating child nodes:
   - Append references to newly generated child nodes as unchecked tasks (`- [ ] <file_path>`) directly into the markdown body of the parent node.
   - Do NOT modify the parent's YAML frontmatter.
   - Do NOT include the parent node in the new child's `depends_on` array to avoid circular dependency deadlocks.
   - Do NOT submit an Empty PR to transition a macro node to VERIFYING until ALL of its generated child nodes have transitioned to COMPLETED.
2. This is a low-risk documentation task, so the Coder is responsible for self-verifying. No separate QA task is required.
3. Reminder for Coder/QA: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to status: FAILED with a rejection_reason.
4. Reminder for Coder/QA: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to status: CANCELLED with a rejection_reason.
5. Reminder for Coder/QA: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Update `001-the-foundry-architecture.md` to detail how to format parent-child relationships for macro nodes.
