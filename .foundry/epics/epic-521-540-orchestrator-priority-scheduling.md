---
id: epic-521-540-orchestrator-priority-scheduling
type: EPIC
title: Orchestrator Priority Scheduling Implementation
status: PENDING
owner_persona: story_owner
created_at: 2026-08-13
updated_at: 2026-08-13
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: prd-148-521-orchestrator-priority-scheduling
rejection_count: 0
rejection_reason: ""
notes: ""
---

## Context
We are introducing a Priority Scheduling Engine in the Foundry DAG Orchestrator to solve GitHub Actions runner starvation, context fragmentation, and severe merge conflicts. This engine will introduce a priority-based execution queue to ensure strategic, focused vertical slice delivery.

## Epic Requirements
- Update the NodeFrontmatterSchema in `.github/scripts/schema.ts` to include an optional `priority` field.
- Update `.foundry/docs/schema.md` to document the new `priority` field with a default of `50`.
- Update `.github/scripts/foundry-orchestrator.ts` to sort nodes by priority in descending order before dispatching and to parse the priority property with a fallback mechanism.
- Update node templates to include `priority: 50` by default.

## Acceptance Criteria
- [ ] Story Owner: Create a STORY to update the NodeFrontmatterSchema and schema documentation for the priority field.
- [ ] Story Owner: Create a STORY to update the Node discovery and dispatch logic in foundry-orchestrator.ts to parse and sort by priority.
