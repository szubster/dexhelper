---
id: story-331-333-remove-orphaned-qa-rule
type: STORY
title: Remove Orphaned QA Rule from Documentation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '398657855742774405'
pr_number: null
parent: epic-115-331-remove-orphaned-qa-task-rule-from-docs
tags:
  - docs
  - agile-coach
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Remove Orphaned QA Rule from Documentation

## Description
The obsolete "Orphaned QA Task Cancellation Rule" needs to be completely removed from system documentation. Although the orchestrator automatically handles cascaded cancellations (Phase 3.6), there are still instructions within `.foundry/docs/knowledge_base/agents/core_policies.md` telling personas to manually modify the markdown bodies of orphaned tasks. This creates confusion and merge conflicts.

This story tracks identifying and removing those obsolete instructions from `.foundry/docs/knowledge_base/agents/core_policies.md`.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks
- [ ] task-333-346-remove-orphaned-qa-rule-impl
