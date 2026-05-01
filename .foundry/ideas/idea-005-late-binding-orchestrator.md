---
id: idea-005-late-binding-orchestrator
type: IDEA
title: "Late Binding Epics & Recursive Orchestration"
status: READY
owner_persona: product_manager
created_at: "2026-04-21"
updated_at: "2026-05-01"
parent: ".foundry/ideas/idea-003-atomic-handoff-foundation.md"
depends_on: []
jules_session_id: null
tags: ["foundry-v2", "architecture", "orchestration"]
---

# Late Binding Epics & Recursive Orchestration

## Problem Statement

The current Foundry model is largely top-down and linear. While it supports dependencies, it lacks the flexibility for agents to "zoom in" or "pivot" during execution. 

1. **Static Planning**: Stories are often written before the technical implementation details are fully known.
2. **Technical Discovery**: An Architect or Tech Lead might realize midway through a Story that new technical outcomes or ADRs are required, but they can't easily spawn sub-tasks and wait for them.
3. **GitHub Limitations**: GitHub Actions crons are unreliable, and state management via "Repository as Database" is slow and prone to race conditions (requiring complex rebase loops).

## Proposed Solution: Late Binding Mode

"Late Binding" means the final structure of an Epic or Story is determined *at runtime* by the agent working on it, rather than upfront by a PM.

### 1. Dynamic Node Spawning
Agents should be granted permission to create new nodes in the DAG. This allows for a "Discovery -> Implementation" loop.

> [!NOTE]
> **Volatile Section**: The following Persona Permissions Matrix is an initial proposal and is subject to change as the system-wide persona mandates are refined.

**Persona Permissions Matrix:**

| Persona | Allowed to Create | Goal |
|---|---|---|
| `architect` | `TASK`, `ADR`, `IDEA` | Propose technical experiments, record decisions, or flag tech debt. |
| `tech_lead` | `TASK`, `ADR` | Break down a Story into concrete implementation steps. |
| `story_owner`| `STORY`, `EPIC` | Dynamically expand an Epic as new requirements emerge. |
| `product_manager` | `IDEA`, `PRD`, `EPIC` | High-level roadmap evolution. |

### 2. The "Wait & Wake" Protocol
When an agent realizes that their current node (e.g., `Story-001`) cannot be completed without the outcome of new tasks:

1. **Spawn**: The agent creates `Task-101`, `Task-102`, and `Task-103`.
2. **Depend**: The agent updates its own `depends_on` field to include these new paths.
3. **Suspend**: The agent updates its status to `PENDING`.
4. **Wake**: The Orchestrator resolves the new tasks. Once they are `COMPLETED`, the parent node (`Story-001`) becomes `READY` again. The agent is re-dispatched with the context of the completed tasks.

### 3. Progressive Feedback (The "Impossible" Loop)
Not every idea is viable. Agents must have a standardized way to signal failure to the parent node or the CEO:
- **Upstream Escalation**: If an Architect determines an ADR is impossible to fulfill or an Idea is fundamentally flawed, they transition the node to `FAILED` with a specific `rejection_reason` in the frontmatter.
- **Resurrection Loop Integration**: The Resurrection Loop (or Orchestrator) detects this and "wakes up" the parent node (STORY/EPIC) or creates a feedback IDEA for the PM/CEO, allowing for strategic pivot rather than infinite technical loops.

---

## Evaluating the "Gastown" Orchestrator (Cloudflare Workers)

To solve the unreliability of GitHub Actions, we propose extracting the logic into an external service.

### Why Cloudflare Workers?
- **Persistence**: Using Cloudflare D1 (SQL) or KV to track node states allows for atomic updates and instant discovery of `READY` tasks.
- **Reliability**: Scheduled Workers (Crons) are significantly more consistent than GitHub Actions.
- **API-First**: The orchestrator can "push" work to GitHub Actions (via `repository_dispatch`) or call the Jules API directly.

### The "Unreachable State" Constraint
> "Jules cannot reach this state."

This is a critical security and stability boundary.
- **Foundry Files**: Remain the source of truth for the codebase and history.
- **Orchestrator DB**: Acts as the *scheduler's memory*. 
- **The Gap**: Jules only sees the markdown. If Jules tries to hallucinate a status change, the Orchestrator (which owns the DB state) will detect the mismatch during the next sync and potentially revert or flag the node. This prevents agents from "lying" about progress in a way that breaks the factory's logic.

## Implications for "Gastown" Transition
1. **API Migration**: The `foundry-orchestrator.ts` script moves from a GitHub Script to a CF Worker.
2. **State Sync**: The Worker polls GitHub (or receives Webhooks) to sync the filesystem state into its DB.
3. **Dispatch**: The Worker triggers the `foundry-engine.yml` workflow only when nodes are actually ready.

## Open Questions
- How do we handle authentication between the Cloudflare Worker and the private Jules instance?
- Should the Worker also handle the "Resurrection Loop" (re-trying failed tasks)?
- Is `idea-003-atomic-handoff-foundation.md` already addressing the state-transition safety that this orchestrator would enforce?

---

*Authored by Antigravity (AI Architect)*

## Next Steps
- [x] **Product Manager**: Draft the PRD specifying the formal requirements for Late Binding Orchestration.
