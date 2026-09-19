---
id: story-563-564-verify-heartbeat-violation-detection
type: STORY
title: Verify Heartbeat Violation Detection
status: READY
owner_persona: tech_lead
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-563-564-implement-heartbeat-violation-detection
tags: [integration, e2e]
research_references:
  - research-488-562-autonomous-violation-detection
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# STORY: Verify Heartbeat Violation Detection

## Objective
Verify that the orchestrator heartbeat correctly detects and flags Jules sessions that enter the \`AWAITING_USER_FEEDBACK\` state, ensuring the Autonomous No-Ask Policy is strictly enforced.

## Acceptance Criteria
- [ ] The heartbeat correctly identifies \`AWAITING_USER_FEEDBACK\` as a violation.
- [ ] Nodes with sessions in this state are transitioned to \`FAILED\`.
