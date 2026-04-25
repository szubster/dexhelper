---
id: story-011-016-wait-wake-implementation
type: STORY
title: "Wait & Wake Protocol Orchestrator Implementation"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-24"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: "1107883359252574246"
parent: ".foundry/epics/epic-011-wait-and-wake-protocol.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
---

# Wait & Wake Protocol Orchestrator Implementation

## Details
Implement the Wait & Wake orchestration logic. When an agent dynamically spawns a downstream node, it updates its own `depends_on` array. The orchestrator needs to support suspending the current session by moving it to `PENDING` and then correctly transitioning it back to `READY` when all downstream dependencies are resolved as `COMPLETED`.

## Acceptance Criteria
- [ ] When an agent spawns downstream nodes and adds them to `depends_on`, its session is suspended and the node status transitions to `PENDING`.
- [ ] The Orchestrator correctly transitions the parent node back to `READY` and re-dispatches the agent once all newly spawned downstream tasks are `COMPLETED`.
