---
id: task-679-728-orchestrator-updates-adr-034
type: TASK
title: Update foundry-orchestrator.ts for ADR 034
status: PENDING
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - adr-679-726-acceptance-criteria-structure
jules_session_id: null
pr_number: null
parent: story-535-679-adr-acceptance-criteria
tags:
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update foundry-orchestrator.ts for ADR 034

## Context
ADR 034 dictates new rules for Acceptance Criteria structure in Foundry nodes. We need to update `packages/foundry/foundry-orchestrator.ts`.

## Requirements
- Update `packages/foundry/foundry-orchestrator.ts` to implement the new Acceptance Criteria rules.
- Ensure the orchestrator only enforces Acceptance Criteria checklists for parent nodes (IDEA, PRD, EPIC, STORY).
- Ensure the orchestrator correctly parses the strict checkbox formats `- [ ] ` and `- [x] `.
