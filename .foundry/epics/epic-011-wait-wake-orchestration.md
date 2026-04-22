---
id: "epic-011-wait-wake-orchestration"
type: "EPIC"
title: "Epic: Wait & Wake Orchestration Protocol"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/epics/epic-010-late-binding-permissions.md
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags: ["v2-architecture", "orchestration", "wait-and-wake"]
---

# Epic: Wait & Wake Orchestration Protocol

## Overview
This Epic builds out the core "Wait & Wake" and "Impossible Loop" mechanisms for Late Binding Orchestration. It allows agents blocked by newly discovered technical realities to dynamically spawn downstream tasks, suspend their own execution, and automatically resume once the orchestrator resolves the newly spawned dependencies.

## Prerequisites
- Implementation of Late Binding Persona Permissions (`.foundry/epics/epic-010-late-binding-permissions.md`)
- Approval of PRD-002: Late Binding Epics & Recursive Orchestration (`.foundry/prds/prd-002-late-binding-orchestrator.md`)

## Acceptance Criteria
- [ ] Implement the Wait & Wake protocol: agents can spawn nodes, append them to `depends_on`, and suspend their session back to `PENDING`.
- [ ] Orchestrator correctly handles the suspended state and re-triggers the parent node to `READY` when all spawned dependencies are `COMPLETED`.
- [ ] Implement the "Impossible Loop": agents can flag a node as `FAILED` with a `rejection_reason` in frontmatter.
- [ ] Orchestrator detects `FAILED` states from the Impossible Loop and wakes the parent node or flags it for `tpm` review.
- [ ] Integration testing across multiple node lifecycles simulating dynamic spawning and wait/wake.
