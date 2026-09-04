---
id: epic-518-531-orchestrator-curator-loop
type: EPIC
title: Orchestrator Curator Loop and Re-Verification
status: PENDING
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
parent: prd-151-518-holistic-code-curator-persona
tags:
  - orchestrator
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Orchestrator Curator Loop and Re-Verification

## Summary
Update the DAG Orchestrator to integrate the post-implementation Curator trigger and manage control handoffs.

## Requirements
- Update `.github/scripts/foundry-orchestrator.ts` to trigger the `curator` persona after features are implemented.
- Implement the "Re-Verification Stage" for `IDEA` nodes.
- Ensure the Orchestrator correctly handles node spawning from the `curator` and loops control back to the originating `IDEA` node.
- Add test coverage for the orchestrator curator loop.

## Acceptance Criteria
- [x] Create STORY for orchestrator trigger logic updates
- [ ] story-531-533-orchestrator-trigger-logic-updates
- [x] Create STORY for IDEA re-verification stage implementation
- [ ] story-531-534-idea-reverification-stage
- [ ] story-531-535-orchestrator-curator-loop-e2e
