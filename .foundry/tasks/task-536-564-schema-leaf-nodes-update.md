---
id: task-536-564-schema-leaf-nodes-update
type: TASK
title: Update Schema for Leaf Node Acceptance Criteria
status: ACTIVE
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '13922667425726498893'
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

# Update Schema for Leaf Node Acceptance Criteria

## Context
Based on `research-534-517-audit-acceptance-criteria`, we are adopting Alternative B. Leaf nodes (TASK, RESEARCH, etc.) that do not spawn children no longer strictly require Acceptance Criteria checklists, as their completion is binary (e.g., PR merge). Parent nodes (IDEA, PRD, EPIC, STORY) still strictly require them.

## Requirements
- Update `.foundry/docs/schema.md` to reflect this new architectural rule.
- Specifically update sections detailing node structures or system invariants to clarify that pure leaf nodes do not need AC checklists, while parent nodes do.

## Acceptance Criteria
- [x] coder: Update `.foundry/docs/schema.md` with the new rule for leaf nodes.
