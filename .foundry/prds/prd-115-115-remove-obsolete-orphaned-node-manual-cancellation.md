---
id: prd-115-115-remove-obsolete-orphaned-node-manual-cancellation
type: PRD
title: Remove Obsolete Orphaned Node Manual Cancellation Rule
status: READY
owner_persona: epic_planner
created_at: '2026-07-15'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-115-remove-obsolete-orphaned-node-manual-cancellation
tags:
  - foundry
  - orchestrator
  - agile-coach
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Remove Obsolete Orphaned Node Manual Cancellation Rule

## Description
The Agile Coach identified friction caused by the obsolete "Orphaned QA Task Cancellation Rule" in `core_policies.md`. The orchestrator's Phase 3.6 cascade cancellation logic now automatically cancels PENDING nodes that depend on permanently failed nodes, making the manual markdown body updates redundant and conflict-prone. This rule has been removed from `core_policies.md` to streamline the agent workflow and align with the Orchestrator's automated capabilities.

## Acceptance Criteria
- [x] Epic Planner: Break down this PRD into Epics.
- [ ] epic-115-331-remove-orphaned-qa-task-rule-from-docs
