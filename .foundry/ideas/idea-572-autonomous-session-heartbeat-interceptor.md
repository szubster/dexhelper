---
id: idea-572-autonomous-session-heartbeat-interceptor
type: IDEA
status: ACTIVE
owner_persona: product_manager
created_at: 2026-09-18T04:53:19Z
updated_at: 2026-09-18T04:53:19Z
rejection_count: 0
rejection_reason: ''
depends_on: []
---

# Autonomous Session Heartbeat Interceptor

## Problem Statement
Despite prompt-level prohibitions against asking conversational questions ("Should I proceed?", "Which option do you prefer?", "Should I open a PR?"), agents occasionally violate the **Autonomous Communication & No-Ask Policy** defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. When an agent ends its turn asking for clarification, it enters an `AWAITING_USER_FEEDBACK` state. Since the Foundry orchestrator is completely autonomous without human operators monitoring live chat, this causes sessions to hang indefinitely until hitting a multi-day timeout.

## Proposed Solution
Introduce an automated interceptor module in `.github/scripts/` (integrated into the Orchestrator's heartbeat/active sweep cycle `foundry-heartbeat.ts` or `sweep-active-nodes.ts`):
1. Query active session transcripts via `session-api.ts`.
2. Pattern match session output against known conversational question regexes (e.g., `/should I (proceed|open|submit)/i`, `/do you have any specific requirements/i`).
3. If non-autonomous agent behavior is detected, automatically trigger a session remediation that submits an autonomous fallback action or marks the task as `FAILED` with a clear `rejection_reason` regarding non-autonomous prompt violations.

## Expected Value
- Eliminates multi-day hanging sessions caused by agents waiting for human input.
- Automatically enforces system-wide autonomous operation policies across all agents.
- Improves overall throughput and pipeline reliability in the Foundry DAG orchestrator.

## Acceptance Criteria
- [ ] Define interceptor logic in `.github/scripts/` to scan active sessions for conversational question patterns.
- [ ] Integrate interceptor with `foundry-heartbeat.ts` or `sweep-active-nodes.ts`.
- [ ] Add unit tests verifying pattern detection and remediation triggers.
