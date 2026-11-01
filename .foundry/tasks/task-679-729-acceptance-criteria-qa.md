---
id: task-679-729-acceptance-criteria-qa
type: TASK
title: QA Verification for ADR 034 Orchestrator Updates
status: PENDING
owner_persona: qa
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - task-679-728-orchestrator-updates-adr-034
jules_session_id: null
pr_number: null
parent: story-535-679-adr-acceptance-criteria
tags:
  - foundry
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Verification for ADR 034 Orchestrator Updates

## Context
ADR 034 modifies the Foundry Orchestrator's rules for Acceptance Criteria, enforcing checklists only on parent nodes and requiring strict formatting (`- [ ] ` and `- [x] `).

## Requirements
- Verify that `packages/foundry/foundry-orchestrator.ts` correctly applies Acceptance Criteria rules based on node type.
- Verify that strict formatting rules are enforced.
- Run the orchestrator test suite (`cd packages/foundry && npx vitest`) to ensure no regressions were introduced.
