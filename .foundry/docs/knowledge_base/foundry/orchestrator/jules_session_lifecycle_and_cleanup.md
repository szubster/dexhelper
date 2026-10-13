# Jules Session Lifecycle, Stuck Setup Detection, and Cloud Pruning

## Overview
Jules (Google's autonomous coding agent) enforces a strict concurrency quota of 15 simultaneous active sessions per organization/repo. When sessions stall indefinitely during environment setup or enter feedback loops, the entire scheduling pipeline deadlocks with `FAILED_PRECONDITION`. Furthermore, unbounded accumulation of historical sessions (>7,000) causes Jules cloud API endpoints (`GET /v1alpha/sessions`) to fail with HTTP 503 and degrades web UI usability.

This document describes the automated detection, remediation, and lifecycle pruning systems implemented in The Foundry.

---

## 1. Stuck Environment Setup Detection
When Jules spins up a VM container, it executes repository setup scripts. If a script hangs or network isolation causes silent starvation, the session remains in `IN_PROGRESS` or `PLANNING` indefinitely without generating any activity.

### Detection Rule
- In `foundry-heartbeat.ts`, during the active nodes sweep:
  - If a session has no associated PR and has elapsed $>20$ minutes since creation:
  - The heartbeat calls `getSessionActivities(sessionId, julesKey)`.
  - If `activities.length === 0`, the session is classified as stuck in environment setup.

### Automated Remediation
1. The node is transitioned back to `READY` using `transitionNodeToReadyWithoutPenalty`:
   - `rejection_count` is **not** incremented (avoiding penalizing the task for infrastructure VM flakiness).
   - `jules_session_id` is set to `null`.
2. The stuck cloud session is deleted immediately via `deleteJulesSession(sessionId, julesKey)`.
3. The concurrent quota slot is instantly freed for subsequent tasks.

---

## 2. Autonomous No-Ask Policy Enforcement
Per repository directives, agents must operate autonomously and never pause to prompt users for confirmation or input in chat.

### Enforcement Rule
- If a Jules session enters `AWAITING_USER_FEEDBACK`:
  1. Heartbeat immediately transitions the node to `FAILED` with reason `"Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK"`.
  2. The cloud session is terminated via `DELETE /v1alpha/sessions/${sessionId}`.

---

## 3. Post-PR Merge & Closure Cleanup
To prevent zombie sessions from consuming cloud resources:
- When a PR is **merged** (`isMerged === true`):
  - Node transitions to `COMPLETED` (or `VERIFYING` / `PENDING` for macro nodes).
  - `jules_session_id` is set to `null`.
  - Heartbeat invokes `deleteJulesSession(sessionId, julesKey)`.
- When a PR is **closed without merging**:
  - Node is resurrected to `READY` (or `FAILED` if max rejection limit reached).
  - `jules_session_id` is set to `null`.
  - Heartbeat invokes `deleteJulesSession(sessionId, julesKey)`.

---

## 4. Periodic Lingering Session Sweep (Pass 5)
Historical nodes that were marked `COMPLETED` or `CANCELLED` in previous cycles may still reference old session IDs in their frontmatter.

- In `foundry-heartbeat.ts` (Pass 5):
  - Heartbeat discovers terminal (`COMPLETED` or `CANCELLED`) nodes with non-null `jules_session_id`.
  - In each run, up to 20 lingering sessions are deleted via `deleteJulesSession` and their frontmatter updated to `jules_session_id: null`.
  - This steadily cleans the backlog without exceeding the Jules API 120 req/min rate limit.

---

## 5. Bulk Historical Session Pruning (`clean-jules-sessions.ts`)
To prune thousands of historical sessions extracted from git commit history and restore responsiveness to the Jules Web UI:

- **Script**: `.github/scripts/clean-jules-sessions.ts`
- **Workflow**: `.github/workflows/clean-jules-sessions.yml`
- **Capabilities**:
  - `harvestAllSessionIds`: Scans git log (`git log --all --format="%s %b"`), candidate files (`jules_source_session_ids.txt`, `sep_ids.txt`), and `.foundry/` frontmatter.
  - `getSafeSessionIds`: Protects all active open PR sessions on GitHub, pinned active PRs, and `ACTIVE`/`VERIFYING`/`READY` nodes in `.foundry/`.
  - Paces requests to conform to rate limits (~100 req/min).
  - Modes: `--stuck-only` (only prune sessions with 0 activities or awaiting feedback) and `--all` (prune all historical completed/failed sessions).

---

## 6. Execution Milestone & Results
- **Total Historical Scope**: 10,284 session IDs identified across git history and branches.
- **Protected Sessions**: 26 sessions safeguarded (active PRs and in-progress Foundry nodes).
- **Pruned Sessions**: 10,258 historical sessions permanently deleted from Jules cloud.
- **API Performance Restored**:
  - `GET /v1alpha/sessions` previously failed with HTTP 503 or timed out at 30 seconds.
  - After pruning, `GET /v1alpha/sessions` responds with **HTTP 200 OK** in ~23 seconds, successfully returning active/recent sessions and restoring Jules web UI usability.
  - Periodic automated sweeps via `clean-jules-sessions.yml` and `foundry-heartbeat.ts` ensure ongoing garbage collection of all future completed/merged sessions.

