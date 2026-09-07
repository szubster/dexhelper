---
id: epic-518-532-priority-population-and-prompts
type: EPIC
title: Populate Priorities and Update Prompts
status: PENDING
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on:
  - epic-518-531-priority-orchestrator-dispatch
jules_session_id: null
pr_number: null
parent: prd-148-518-priority-based-dispatch-queue
tags:
  - orchestrator
  - scheduling
  - data-migration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Populate Priorities and Update Prompts

## Context
As requested during code review for PRD `prd-148-518-priority-based-dispatch-queue`, we need to figure out whether priorities should be retroactively populated for existing nodes in the foundry. Additionally, the agent prompts must be updated to be aware of and utilize the priority feature.

## Functional Requirements
- Identify high-priority existing nodes and backfill the `priority` field in their YAML frontmatter.
- Update relevant persona prompts (e.g., Epic Planner, Story Owner) to instruct them to assign appropriate priorities to newly generated nodes.

## Acceptance Criteria
- [ ] Story Owner: Break down into tasks/stories to implement prompt updates and node backfilling.
- [ ] A final STORY is created exclusively for Integration and E2E Verification (tagged with `e2e` or `integration`).
