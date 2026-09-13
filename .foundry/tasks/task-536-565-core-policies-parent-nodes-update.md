---
id: task-536-565-core-policies-parent-nodes-update
type: TASK
title: Update Core Policies for Parent Node Acceptance Criteria
status: ACTIVE
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '3390635956715120327'
locks: []
pr_number: null
parent: story-534-536-propose-acceptance-criteria-alternatives
priority: 50
tags:
  - foundry
  - architecture
research_references:
  - .foundry/research/research-534-517-audit-acceptance-criteria.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Core Policies for Parent Node Acceptance Criteria

## Context
Based on `research-534-517-audit-acceptance-criteria`, we are adopting Alternative D for parent nodes. We must enforce strict formatting and manual checking requirements for parent nodes (IDEA, PRD, EPIC, STORY) via our core policies.

## Requirements
- Update `.foundry/docs/knowledge_base/agents/core_policies.md` to explicitly enforce the strict Markdown checkbox format (`- [ ]`) for parent node Acceptance Criteria.
- Emphasize that agents must correctly format these checkboxes to avoid regex parsing failures.

## Acceptance Criteria
- [ ] coder: Update `.foundry/docs/knowledge_base/agents/core_policies.md` to enforce strict AC formatting for parent nodes.
