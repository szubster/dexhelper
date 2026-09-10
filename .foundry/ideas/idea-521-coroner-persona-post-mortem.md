---
id: idea-521-coroner-persona-post-mortem
type: IDEA
title: Coroner Persona for Automated Post-Mortem Analysis
status: READY
owner_persona: product_manager
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

## Description
To improve the Foundry Orchestrator's resilience and ensure that permanent failures yield valuable system improvements, this idea proposes the introduction of a new Foundry Owner Persona: the **`coroner`**.

Following the Generation 1 gamification theme (e.g., Snorlax as the Librarian, Meowth as the TPM), the `coroner` will be mapped to **Gengar (#094 - The Shadow Observer)**. It thrives in the graveyard of failed nodes, extracting value from dead processes.

Currently, when a node is aborted permanently (e.g., reaching Max Rejection Count) and transitioned to `CANCELLED`, the Orchestrator safely drops it from the DAG to prevent infinite resurrection loops. However, the context of *why* it failed—such as missing architectural scaffolding, undocumented constraints, or framework limitations—is often lost. The `coroner` persona will automatically awaken when a node transitions to `CANCELLED`, dissect the node's rejection history, and generate actionable post-mortem artifacts.

---

## Rationale & Benefits
- **Automated Root Cause Analysis:** Ensures that every permanent failure is investigated, preventing silent knowledge loss.
- **Systematic Healing:** The coroner can dynamically spawn `RESEARCH` or `ADR` nodes based on the post-mortem, converting failures into actionable technical debt remediation.
- **Improved Grounding:** Feeds directly into the `librarian` persona's knowledge base by documenting what *not* to do, saving future API costs and execution cycles.
- **Gamification Synergy:** Adds a compelling "graveyard shift" role to the Foundry's automated workforce.

---

## Functional Mechanics
1. **Trigger:** The Orchestrator awakens the Gengar persona (Coroner) whenever a node's status is updated to `CANCELLED`.
2. **Dissection:** It reads the failed node's `rejection_reason`, the associated auditor/QA journals, and the final state of the implementation attempt.
3. **Artifact Generation:** It generates a standardized Post-Mortem Report in `.foundry/docs/post_mortems/`.
4. **Actionable Spawning:** If applicable, it uses late-binding to spawn new `RESEARCH` or `ADR` nodes to address the root cause, assigning them to the appropriate persona (e.g., `researcher`, `architect`).

---

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD outlining the exact triggers, scripts, and responsibilities for the `coroner` persona.
- [ ] Architect: Review the proposed system architecture for integrating the `coroner` into the Foundry Orchestrator's state transition events.
- [ ] Coder: Update `schema.md` to formally introduce the `coroner` role mapped to Gengar.
- [ ] Coder: Implement the Node/TypeScript scripts in `.github/scripts/` to enable the Coroner's post-mortem extraction phase.
