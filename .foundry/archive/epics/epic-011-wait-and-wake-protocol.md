---
id: epic-011-wait-and-wake-protocol
type: EPIC
title: "Wait & Wake Protocol and Impossible Loop"
status: "COMPLETED"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-25"
depends_on:
  - .foundry/archive/epics/epic-010-persona-permissions.md
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
---

# Wait & Wake Protocol and Impossible Loop

## Details
Implement the orchestration logic required to support the "Wait & Wake" protocol and the "Impossible" failure loop. This allows agents to suspend their sessions when blocked by dynamically spawned nodes and provides a standardized way to signal failure upstream.

## Prerequisites
- Completion of `epic-010-persona-permissions`.

## High-level Acceptance Criteria
- [x] When an agent spawns downstream nodes and adds them to `depends_on`, its session is suspended and the node status transitions to `PENDING`.
- [x] The Orchestrator correctly transitions the parent node back to `READY` and re-dispatches the agent once all newly spawned downstream tasks are `COMPLETED`.
- [x] If a node is fundamentally impossible, the agent transitions the node to `FAILED` with a `rejection_reason` in the frontmatter.
- [x] The Orchestrator detects `FAILED` nodes and either "wakes up" the parent node or flags it for the `tpm` to create a feedback `IDEA` for the PM/CEO.

### Generated Stories
- `.foundry/stories/story-011-016-wait-wake-implementation.md`
- `.foundry/stories/story-011-017-impossible-loop.md`
