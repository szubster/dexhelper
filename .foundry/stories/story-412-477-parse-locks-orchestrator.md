---
id: story-412-477-parse-locks-orchestrator
type: STORY
title: Parse locks field in Orchestrator
status: READY
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-412-orchestrator-resource-locking
tags:
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Parse locks field in Orchestrator

## Objective
Update the orchestrator script to parse and validate the new `locks` field from Foundry nodes.

## Requirements
- Modify `.github/scripts/foundry-orchestrator.ts` (or the underlying zod schema if applicable) to parse the `locks` array.
- Ensure `locks` is an array of strings. Default to an empty array if missing.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-477-506-update-schema-locks-impl
