---
id: task-333-338-remove-orphaned-qa-rule-impl
type: TASK
title: Remove Orphaned QA Rule from Documentation
status: PENDING
owner_persona: coder
created_at: '2026-07-20'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-331-333-remove-orphaned-qa-rule
tags:
  - docs
  - agile-coach
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Remove Orphaned QA Rule from Documentation

## Description
The story `story-331-333-remove-orphaned-qa-rule` notes that there are obsolete instructions within `.foundry/docs/knowledge_base/agents/core_policies.md` telling personas to manually modify the markdown bodies of orphaned tasks.
Your task is to identify and remove any obsolete rules regarding orphaned QA tasks or orphaned dependent child tasks from `.foundry/docs/knowledge_base/agents/core_policies.md`.

Specifically, look at the `Handling Permanent Child Failures (The Impossible Loop)` section, which currently says:
`(Note: The Orchestrator will automatically cascade cancellations to any orphaned dependent child nodes).`
Ensure that any legacy text that might cause confusion about manually handling orphaned tasks is completely cleaned up according to the story's requirements. Note: the memory mentions `Handling Cancelled/Replaced Tasks as QA: If your target implementation task is permanently failed (CANCELLED) or explicitly replaced, you must check off your own Acceptance Criteria checkboxes in your QA task's Markdown body and submit an Empty PR to allow the QA node to gracefully exit the DAG.` Check if this exists in the file and if it does, remove it.

## Acceptance Criteria
- [ ] Remove obsolete instructions regarding orphaned QA tasks from `.foundry/docs/knowledge_base/agents/core_policies.md`.
