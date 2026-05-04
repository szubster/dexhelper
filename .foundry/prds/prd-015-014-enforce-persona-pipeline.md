---
id: prd-015-014-enforce-persona-pipeline
type: PRD
title: Enforce Persona Pipeline Handoffs in DAG Orchestrator
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: '1243563650925522555'
pr_number: null
parent: .foundry/ideas/idea-015-enforce-persona-pipeline.md
tags:
  - foundry
  - dag
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Enforce Persona Pipeline Handoffs in DAG Orchestrator

## 1. Context and Problem Statement
The Foundry Orchestrator uses a Directed Acyclic Graph (DAG) to execute nodes in parallel. Currently, nodes are occasionally being assigned to incorrect personas, breaking the required pipeline flow. For example, `prd-013-012` was assigned to `architect` instead of `epic_planner`, which resulted in silent failures and an endless resurrection loop.
The pipeline expects a strict handoff sequence between specific nodes and personas to function correctly. If an improper assignment occurs, the downstream logic expects artifacts or reviews that will not happen properly.

## 2. Objective
Introduce a pre-flight schema validation check in the DAG Orchestrator to ensure that the `owner_persona` defined in the YAML frontmatter strictly matches the expected persona for the given node `type`.

## 3. Allowed Type-to-Persona Mappings
Based on the Foundry schema (`.foundry/docs/schema.md`), the pipeline must strictly enforce these ownership rules:

| Node `type` | Allowed `owner_persona` values |
|---|---|
| `IDEA` | `product_manager` |
| `PRD` | `epic_planner` |
| `EPIC` | `story_owner` |
| `STORY` | `tech_lead` |
| `TASK` | `coder`, `qa` |

**Note on Architect:**
The `architect` persona is restricted to ADRs/architecture tasks and should generally not own core pipeline nodes (unless specific future rules are introduced).

**Note on Pipeline Order and Handoff:**
The pipeline follows a strict handoff sequence between specific nodes and personas. Set the `owner_persona` of newly created downstream nodes to the persona responsible for the NEXT pipeline transition:
- `IDEA` -> `product_manager`
- `PRD` -> `epic_planner`
- `EPIC` -> `story_owner`
- `STORY` -> `tech_lead`
- `TASK` -> `coder` or `qa`

## 4. Requirements
1. **Validation Logic:** Add logic to `foundry-orchestrator.ts` (or a dedicated validation module) that runs before a node is considered for dispatch or transition to `READY`.
2. **Failure Handling:** If a mismatch is detected, the orchestrator should immediately flag the node as invalid (e.g., skip it, log a strong error, or transition it to `FAILED` with a `rejection_reason`) instead of dispatching a Jules session.
3. **Exemptions:** The `human` persona bypasses Jules dispatch entirely according to `schema.md`. Ensure the `human` persona is a valid owner for ANY node type if explicit manual intervention is taking place.

## 5. Next Steps
- [x] Implement the EPIC breakdown for this PRD.
- .foundry/epics/epic-014-025-enforce-persona-pipeline-handoffs.md
