---
id: epic-563-564-implement-heartbeat-violation-detection
type: EPIC
title: Implement Heartbeat Detection for Autonomous Violations
status: READY
owner_persona: story_owner
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-488-563-autonomous-violation-detection
tags: []
research_references:
  - research-488-562-autonomous-violation-detection
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# EPIC: Implement Heartbeat Detection for Autonomous Violations

## Objective
Implement a system to enforce the Autonomous No-Ask Policy by updating the Orchestrator's heartbeat to detect and handle sessions that enter the `AWAITING_USER_FEEDBACK` state, as recommended by the research phase.

## Prerequisites
- Orchestrator heartbeat mechanism must be active.
- Access to Jules API session state.

## High-Level Acceptance Criteria
- [ ] The heartbeat script (`.github/scripts/foundry-heartbeat.ts`) monitors Jules session states.
- [ ] The heartbeat correctly detects when a session transitions to the `AWAITING_USER_FEEDBACK` state.
- [ ] The heartbeat flags this state as a violation of the Autonomous No-Ask Policy and triggers an appropriate rejection/failure for the node.
- [ ] An integration/E2E STORY is created to verify the heartbeat correctly detects and rejects these violations.
