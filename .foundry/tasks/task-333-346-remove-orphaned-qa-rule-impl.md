---
id: task-333-346-remove-orphaned-qa-rule-impl
type: TASK
title: Remove Orphaned QA Rule from Documentation
status: READY
owner_persona: coder
created_at: '2026-07-26'
updated_at: '2026-07-26'
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

## Context
The obsolete "Orphaned QA Task Cancellation Rule" (or similar wording regarding manual cancellation/modification of orphaned tasks) needs to be completely removed from `.foundry/docs/knowledge_base/agents/core_policies.md`. The orchestrator now automatically handles cascaded cancellations (Phase 3.6), so these manual instructions cause confusion and merge conflicts.

## Requirements
- Locate any instructions in `.foundry/docs/knowledge_base/agents/core_policies.md` that tell personas to manually modify the markdown bodies of orphaned or cascaded tasks (e.g., QA tasks that lose their parent implementation task).
- Remove these obsolete instructions entirely.
- Ensure the remaining documentation flows logically after the removal.

## Acceptance Criteria
- [ ] The obsolete rule regarding manual modification of orphaned task markdown bodies is removed from `.foundry/docs/knowledge_base/agents/core_policies.md`.
- [ ] Verification complete (self-verified by Coder since this is a low-risk documentation change).
