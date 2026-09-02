---
id: story-417-444-adr-013-state-compliance-linter
type: STORY
title: Enforce ADR 013 State Constraints via Linter
status: READY
owner_persona: tech_lead
created_at: '2026-08-23T00:00:00.000Z'
updated_at: '2026-09-01'
depends_on:
  - story-417-443-adr-008-ui-compliance-linter
jules_session_id: null
pr_number: null
parent: epic-142-417-automated-adr-compliance-linter
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Enforce ADR 013 State Constraints via Linter

## Problem Definition
ADR 013 specifies that React context must be used for lifting state to share between the Kanban Board and React Flow visualizations in relevant dashboard views. There is currently no static check ensuring this pattern is followed.

## Proposed Solution
Extend the static analysis script (`scripts/verify-adr-compliance.ts`) created in the previous story to enforce ADR 013 state constraints.
- Implement logic to check relevant dashboard view files (e.g., Kanban and DAG visualizers) to ensure they consume data via a shared React Context or a centralized state store.
- Flag direct local state management where context is mandated by ADR 013.

## Acceptance Criteria
- [x] Break down this story into actionable engineering tasks.
- [ ] task-444-517-implement-adr013-linter
- [ ] task-444-518-qa-adr013-linter
