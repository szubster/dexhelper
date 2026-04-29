---
id: epic-008-018-session-dispatch-bypass
type: EPIC
title: "Session Dispatch Bypass and Fulfillment"
status: "READY"
owner_persona: story_owner
created_at: "2026-04-29"
updated_at: "2026-04-29"
depends_on: []
jules_session_id: null
parent: .foundry/prds/prd-010-008-idempotent-node-generation.md
tags: ["orchestrator", "generation", "efficiency"]
rejection_count: 1
rejection_reason: ""
notes: ""
---

# Epic: Session Dispatch Bypass and Fulfillment

## Overview
Update the orchestrator to bypass Jules session dispatch for nodes whose targets already exist.

## Requirements
- If target nodes exist and are valid, the orchestrator should bypass the session dispatch.
- The orchestrator should directly mark the current node's generation sub-task as fulfilled without waking an agent.
- Ensure partial or malformed files still trigger generation or an error.

## Acceptance Criteria
- [ ] Jules session dispatch is bypassed when valid target nodes exist.
- [ ] Parent node generation sub-task is automatically fulfilled without agent wake-up.
