---
id: research-407-676-e2e-failure-investigation
type: RESEARCH
title: Investigate Autonomous No-Ask Policy Violation in E2E Tasks
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-10'
updated_at: '2026-10-14'
depends_on: []
jules_session_id: '17936225256393113062'
parent: story-397-407-gen3-secret-base-parsing-e2e
tags:
  - research
  - e2e
rejection_count: 2
rejection_reason: ''
locks: []
---

# RESEARCH: Investigate Autonomous No-Ask Policy Violation in E2E Tasks

## Context
The child tasks for Gen 3 Secret Base E2E verification failed due to an Autonomous No-Ask Policy Violation (Session entered AWAITING_USER_FEEDBACK). We need to investigate why the coder agent asked a question instead of working autonomously.

## Objectives
- Review the chat logs or prompt context to understand why the agent asked a question.
- Formulate a plan or set of constraints to prevent this in the retry tasks.

## Acceptance Criteria
- [x] Determine the root cause of the policy violation.
- [x] Provide recommendations for the retry tasks.

## Findings

### Root Cause
The child tasks (e.g., `task-407-668-e2e-base-location-parsing`) failed because the session entered the `AWAITING_USER_FEEDBACK` state. This occurs when an agent directly violates the **Autonomous Communication & No-Ask Policy** by ending its turn with a conversational prompt or question directed at the user. Since the Orchestrator operates fully autonomously without a human in the loop, asking a question causes the session to hang indefinitely until it times out or is forcibly failed by the Orchestrator's heartbeat.

### Recommendations for Retry Tasks
To prevent this in the retry tasks (`task-407-677`, `task-407-678`, `task-407-679`):
1. **Enforce the No-Ask Policy:** The Coder and QA agents must never ask the user questions, ask for permission to proceed, or seek feedback in chat.
2. **Autonomous Submission:** Agents must autonomously finalize their work using the `submit` tool without confirming with the user first.
3. **Use Late Binding for Missing Context:** If the agents lack context, they must not ask the user for hints. Instead, they should dynamically spawn new nodes (like `RESEARCH` or `IDEA`) via Late Binding, append them to the current task, and submit.
