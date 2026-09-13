---
id: prd-521-565-coroner-persona-post-mortem
type: PRD
title: Coroner Persona for Automated Post-Mortem Analysis
status: READY
owner_persona: epic_planner
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-521-coroner-persona-post-mortem
tags:
  - foundry
  - orchestrator
  - optimization
  - error-handling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Coroner Persona for Automated Post-Mortem Analysis

## Objective
Introduce the **`coroner`** persona (mapped to Gengar) to perform automated root-cause analysis on permanently failed (CANCELLED) nodes, generate post-mortem reports, and dynamically spawn RESEARCH or ADR nodes to remediate technical debt.

## Functional Requirements

1. **State Trigger**:
   - The Orchestrator MUST awaken the `coroner` persona whenever a node transitions to the `CANCELLED` state due to a permanent failure (e.g., reaching the Max Rejection Count).
2. **Data Dissection**:
   - The `coroner` MUST read the target node's `rejection_reason` from the YAML frontmatter.
   - The `coroner` MUST read the associated auditor or QA journals using the `read_file` tool to understand the failure context.
3. **Post-Mortem Generation**:
   - The `coroner` MUST generate a standardized Post-Mortem markdown report in the `.foundry/docs/post_mortems/` directory.
   - The report MUST include the failure reason, historical context, and any identified system or documentation gaps.
4. **Actionable Remediation (Late-Binding)**:
   - The `coroner` MUST use the late-binding protocol to dynamically spawn new `RESEARCH` or `ADR` nodes if a documentation gap or architectural ambiguity is the root cause.
   - Newly spawned nodes MUST be assigned to the appropriate persona (`researcher` or `architect`) and linked to the post-mortem report.
5. **Schema Update**:
   - `.foundry/docs/schema.md` MUST be updated to formally define the `coroner` persona, mapping it to Gengar (#094), and detailing its responsibilities.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics covering the Schema updates, Orchestrator triggers, and Coroner scripts.
