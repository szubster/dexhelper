---
id: idea-002-collision-free-ids
type: IDEA
title: "Distributed IDs & Concurrency Resilience"
status: "COMPLETED"
owner_persona: product_manager
created_at: "2026-04-21"
updated_at: "2026-04-21"
parent: ".foundry/ideas/idea-001-the-foundry.md"
depends_on:
  - .foundry/ideas/idea-001-the-foundry.md
jules_session_id: null
---

# IDEA-002: Distributed IDs & Concurrency Resilience

## 1. Problem Statement
The current V1.0 sequential numbering system (`task-001`, `task-002`) is a bottleneck for parallel execution. When multiple agents work on concurrent branches, they lack a shared "last ID" state, leading to:
- **Filename Collisions**: Two agents both picking `task-014.md`.
- **ID Clashes**: Duplicate `id` fields in frontmatter, violating system invariants.
- **Rebase Hell**: Jules is unable to resolve Git conflicts caused by these clashes.

## 2. Similar Problems Identified
- **Shadow Dispatches**: A node marked `ACTIVE` on a branch is still seen as `READY` on `main`. If the orchestrator runs again before the branch merges, it will dispatch the same node to a second agent.
- **Stale Branch Context**: Agents branching from a base that is moving forward fast, leading to "ghost" edits of refactored code.

## 3. Solution Pitch
The system must move to a decentralized identity scheme that removes the need for agents to know the global "latest" sequence number.

### 3.1 Naming Suggestion
One possible convention is:
`<parentid>-<id>-<slug>.md`

**Note:** Agents (PM, Tech Lead) are explicitly encouraged to propose and evaluate alternative solutions, such as:
- Content-hash suffixes (`task-014-a8f2.md`).
- UUID-based IDs.
- A "Pre-Commit Lock" or "ID Registry" that prevents shadowed status transitions.

## 4. Next Steps
Foundry Agents (PM, Epic Planner, Tech Lead) should take this Idea and evolve it through the PRD and Story cycles. 
- [x] **Product Manager**: Define the requirements for resilience and uniqueness.
- [ ] **Tech Lead**: Spec out the orchestrator modifications and rebase-automation logic.
