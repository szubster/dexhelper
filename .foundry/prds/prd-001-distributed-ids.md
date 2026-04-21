---
id: prd-001-distributed-ids
type: PRD
title: "Distributed IDs & Concurrency Resilience"
status: "ACTIVE"
owner_persona: epic_planner
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/ideas/idea-002-collision-free-ids.md
jules_session_id: "12200486811939060835"
parent: .foundry/ideas/idea-002-collision-free-ids.md
---

# PRD: Distributed IDs & Concurrency Resilience

## 1. Problem Statement
The Foundry's current sequential numbering system (`task-001`, `task-002`) causes friction in a parallel, multi-agent environment. Multiple agents branching concurrently lack a shared state to determine the "next" ID. This leads to filename collisions (e.g., two agents creating `task-014.md`), frontmatter `id` clashes, and complex Git merge conflicts that block autonomous operation.

Furthermore, we've identified operational flaws related to branching and dispatch:
- **Shadow Dispatches:** A node transition to `ACTIVE` on a branch is not reflected on `main`. The orchestrator, unaware of the branch, may re-dispatch the same `READY` node to another agent.
- **Stale Context:** Agents branching from a rapidly advancing base might end up with ghost edits on refactored code.

## 2. Goals & Non-Goals

### Goals
- Establish a collision-free ID and naming convention for all Foundry lifecycle nodes (IDEA, PRD, EPIC, STORY, TASK).
- Provide architectural mechanisms to detect and prevent "Shadow Dispatches".
- Ensure that agents operating concurrently do not conflict on filesystem operations for node creation.

### Non-Goals
- Real-time Git conflict resolution logic within Jules.
- Complete overhaul of the YAML frontmatter schema beyond the `id` generation and tracking mechanisms.

## 3. Distributed ID Scheme

To eliminate the need for centralized sequence tracking, node identifiers must shift to a decentralized model. The orchestrator and agents will adopt one of the following proposed patterns (to be finalized by the Tech Lead):

1. **Content-Hash Suffix:** `task-014-a8f2.md`
2. **UUID-Based IDs:** Using UUIDv4 or shorter variations (e.g., `task-8f92a3b1.md`)
3. **Parent-Child Hierarchy:** `<parentid>-<id>-<slug>.md`

The chosen method must guarantee high entropy to prevent collisions when created autonomously across parallel branches.

## 4. Prevention of Shadow Dispatches

To address Shadow Dispatches, the orchestrator needs a way to lock nodes that are currently being worked on in open branches, even if those branches haven't merged to `main` yet.

Proposed mitigation strategy:
- **GitHub PR & Session Inspection:** Since we already monitor the status of Jules sessions, the orchestrator simply needs to query GitHub for open PRs and cross-reference which nodes are currently marked `ACTIVE` within those PRs (and verify their corresponding session is alive) to prevent re-dispatch. A separate lock file or registry is not required.

## 5. Pre-Commit Hooks
Pre-commit hooks will be implemented (or extended) to automatically validate the integrity of the new ID scheme across the `.foundry` directory, enforcing that no two node files possess the same `id` field before a branch can be submitted.

## 6. Acceptance Criteria
- [x] A new collision-free ID schema is adopted and documented in the master schema.
- [x] The orchestrator and node generation templates are updated to utilize the new schema.
- [x] A concrete mechanism to prevent shadow dispatches is designed and implemented.
- [x] Pre-commit validation ensures ID uniqueness across the `.foundry` directory.

## 7. Generated Epics
- `.foundry/epics/epic-004-distributed-id-schema.md`: Decision and implementation of the collision-free ID schema and updating templates.
- `.foundry/epics/epic-005-shadow-dispatch-prevention.md`: GitHub PR & session inspection mechanism to lock nodes currently actively worked on in open branches.
- `.foundry/epics/epic-006-id-pre-commit-hooks.md`: Pre-commit hook implementation to automatically validate the integrity of the new ID scheme across the directory.
