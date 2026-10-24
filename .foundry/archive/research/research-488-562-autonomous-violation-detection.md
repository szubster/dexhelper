---
id: research-488-562-autonomous-violation-detection
type: RESEARCH
title: Investigate Mechanisms for Detecting Autonomous Execution Violations
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-488-autonomous-execution-enforcement
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Research: Investigate Mechanisms for Detecting Autonomous Execution Violations
Investigate alternative mechanisms to detect autonomous execution violations, as git history scanning was cancelled. Consider investigating Jules API endpoints or leveraging the orchestrator's AWAITING_USER_FEEDBACK state.

## Findings

### AWAITING_USER_FEEDBACK State
The Jules API returns session states via `https://jules.googleapis.com/v1alpha/sessions/${sessionId}`. One of the returned states is `AWAITING_USER_FEEDBACK`. The Orchestrator's heartbeat (`.github/scripts/foundry-heartbeat.ts`) already monitors these states. If a session enters this state, it indicates the agent has paused its autonomous execution to ask the user a question. We can detect this state transition in the heartbeat and flag it as a violation of the No-Ask Policy, potentially failing the node or logging the violation.

### Session Activities API
The `getSessionActivities` method in `.github/scripts/session-api.ts` fetches the activity feed for a session. Activities include `agentMessaged` and `userMessaged` events. We can scan these activities for instances where the agent messaged the user asking for input, or where the user provided input. This provides a way to audit the exact messages that constituted the violation.

### Conclusion
Relying on the `AWAITING_USER_FEEDBACK` state is the most efficient and reliable mechanism for detecting autonomous execution violations in real-time via the orchestrator heartbeat. The `getSessionActivities` API can be used as a secondary, more detailed auditing mechanism if needed.
