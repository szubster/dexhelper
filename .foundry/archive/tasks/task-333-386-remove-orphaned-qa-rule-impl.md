---
id: task-333-386-remove-orphaned-qa-rule-impl
type: TASK
title: Implement - Remove Orphaned QA Rule from Documentation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-331-333-remove-orphaned-qa-rule
tags:
  - docs
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement - Remove Orphaned QA Rule from Documentation

## Context
The "Orphaned QA Task Cancellation Rule" mentioned in `.foundry/docs/knowledge_base/agents/core_policies.md` is obsolete and causes confusion. The orchestrator now automatically handles cascaded cancellations (Phase 3.6). We need to remove any instructions telling personas to manually modify the markdown bodies of orphaned tasks.

## Objective
Remove the obsolete instructions related to the "Orphaned QA Task Cancellation Rule" from the `core_policies.md` file.

## Technical Details
- Locate references to the obsolete rule in `.foundry/docs/knowledge_base/agents/core_policies.md` and carefully remove the outdated instructions. Ensure the rest of the documentation flows naturally after removal.

## Acceptance Criteria
- [x] Coder: Remove obsolete instructions regarding the "Orphaned QA Task Cancellation Rule" from `.foundry/docs/knowledge_base/agents/core_policies.md`.
