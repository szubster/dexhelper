---
id: "prd-002-late-binding-orchestrator"
type: "PRD"
title: "Late Binding Epics & Recursive Orchestration"
status: "ACTIVE"
owner_persona: "epic_planner"
created_at: "2026-04-21"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: "13477564740099269137"
parent: ".foundry/ideas/idea-005-late-binding-orchestrator.md"
tags:
  - "foundry-v2"
  - "architecture"
  - "orchestration"
---

# PRD: Late Binding Epics & Recursive Orchestration

## Executive Summary

The Foundry system currently relies on a top-down and linear model. While it supports dependencies, agents lack the flexibility to dynamically spawn nodes during execution. This limitation prevents a dynamic "Discovery -> Implementation" loop and forces an over-reliance on static upfront planning, which often falters when technical realities surface during implementation.

This PRD formalizes the transition to a **Late Binding Orchestration** model, enabling dynamic node spawning, progressive feedback loops, and a robust external state-sync service via Cloudflare Workers to overcome the limitations and unreliability of GitHub Actions.

## 1. Core Principles

- **Late Binding Mode:** The final structure of an Epic or Story is determined *at runtime* by the agent working on it, rather than upfront by a Product Manager.
- **Dynamic Node Spawning:** Specific personas are granted permission to create new nodes in the DAG, allowing for "zoom in" or "pivot" actions mid-execution.
- **Progressive Feedback (The "Impossible" Loop):** Agents have a standardized way to signal failure upstream, allowing the Resurrection Loop to orchestrate strategic pivots.
- **"Gastown" Orchestrator:** Moving the orchestration logic from GitHub Actions to an external Cloudflare Worker service for better state management, reliability, and security boundary enforcement.

## 2. Functional Requirements

### 2.1 Persona Permissions Matrix
The system must enforce specific permissions for dynamic node creation:
- `architect`: Can create `TASK`, `ADR`, `IDEA` nodes to propose technical experiments, record decisions, or flag tech debt.
- `tech_lead`: Can create `TASK`, `ADR` nodes to break down a Story into concrete steps.
- `story_owner`: Can create `STORY`, `EPIC` nodes to expand requirements dynamically.
- `product_manager`: Can create `IDEA`, `PRD`, `EPIC` nodes for roadmap evolution.

### 2.2 The "Wait & Wake" Protocol
When an agent is blocked by new technical realities:
1. **Spawn:** The agent creates the necessary downstream nodes (e.g., `Task-101`).
2. **Depend:** The agent updates its own node's `depends_on` field to include the newly spawned nodes.
3. **Suspend:** The agent's session is suspended and the node status transitions back to `PENDING`.
4. **Wake:** The Orchestrator resolves the new tasks. Once `COMPLETED`, the original parent node transitions to `READY` and the agent is re-dispatched.

### 2.3 The "Impossible" Loop
- If a node is fundamentally impossible, the agent transitions the node to `FAILED` with a `rejection_reason` in the frontmatter.
- The Orchestrator detects this failure and "wakes up" the parent node, or flags it for the `tpm` to create a feedback `IDEA` for the PM/CEO.

### 2.4 Evaluating the "Gastown" Orchestrator (Cloudflare Worker)
> [!NOTE]
> *This migration is pending deep evaluation to avoid overcomplicating the system. It may not be needed if GitHub Actions reliability can be improved natively.*

- **Evaluation Goal:** Assess if extracting `foundry-orchestrator.ts` logic to a Cloudflare Worker provides necessary reliability.
- **State Store (Proposed):** Utilize Cloudflare D1 (SQL) or KV to persist node states.
- **Sync Mechanism:** The Worker must poll GitHub or receive Webhooks to sync the markdown file state with its internal database.
- **Unreachable State Constraint:** Jules cannot access the Orchestrator DB. Hallucinations in markdown status will be detected during the sync, preventing agents from breaking the state logic.

## 3. Success Metrics
- **Dynamic Adaptability:** Increase in the number of nodes dynamically spawned by `tech_lead` or `architect` during active implementation.
- **Reliability:** 100% successful and timely dispatch of `READY` tasks, eliminating GitHub Actions cron unreliability.
- **Error Recovery:** Reduction in manual PM intervention for deadlocked or impossible tasks due to the Resurrection Loop.

## 4. Next Steps
- [x] **Epic Planner:** Break down this PRD into Epics mapping out the persona permission implementations, the Wait & Wake protocol orchestration logic, and the Cloudflare Worker Gastown migration.

### Generated Epics
- [.foundry/epics/epic-010-persona-permissions.md](../epics/epic-010-persona-permissions.md)
- [.foundry/epics/epic-011-wait-and-wake-protocol.md](../epics/epic-011-wait-and-wake-protocol.md)
- [.foundry/epics/epic-012-gastown-orchestrator.md](../epics/epic-012-gastown-orchestrator.md)
