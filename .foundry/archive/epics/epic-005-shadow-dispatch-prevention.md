---
id: epic-005-shadow-dispatch-prevention
type: EPIC
title: "Shadow Dispatch Prevention & Cross-Branch Locks"
status: "COMPLETED"
owner_persona: story_owner
created_at: "2026-04-21"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: .foundry/prds/prd-001-distributed-ids.md
tags: ["orchestrator", "concurrency"]
rejection_count: 1
notes: ""
---

# Epic: Shadow Dispatch Prevention & Cross-Branch Locks

## Overview
This epic aims to solve the "Shadow Dispatch" problem where the orchestrator dispatches the same `READY` node to multiple agents because it lacks visibility into unmerged branches where a node has already transitioned to `ACTIVE`.

## Scope
0. **Verification Phase:** Conduct a rigorous investigation to verify if "Shadow Dispatch" is actually a problem in practice, or if the current locking mechanisms implicitly handle it.
1. **GitHub PR Inspection:** Develop an orchestrator mechanism to query open GitHub Pull Requests.
2. **Session Verification:** Cross-reference active PRs to identify which nodes are currently marked `ACTIVE` within those PR branches.
3. **Dispatch Blocking:** Validate the node's associated `jules_session_id` using the Jules API. If the session is alive, lock the node from being dispatched again.

## Dependencies
None. This can be developed in parallel to the ID schema changes.

## Stories
- [ ] .foundry/stories/story-004-shadow-dispatch-verification.md

## High-Level Acceptance Criteria
- [ ] The orchestrator logic successfully queries open PRs for `ACTIVE` nodes.
- [ ] The orchestrator cross-references `ACTIVE` nodes with live Jules sessions to confirm activity.
- [ ] Nodes actively worked on in open branches are prevented from re-dispatch to new agents.
