---
id: idea-153-foundry-rearchitecture-and-code-architect-persona
type: IDEA
title: >-
  Foundry Rearchitecture: State Machine/Graph Libraries & Scheduled Code
  Architect Persona
status: READY
owner_persona: product_manager
created_at: '2026-08-15'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
  - state-machine
  - dag
  - refactoring
  - personas
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Foundry Rearchitecture: State Machine/Graph Libraries & Scheduled Code Architect Persona

## Context & Vision
As Foundry continues to evolve, the orchestrator and DAG resolution engine (`.github/scripts/foundry-orchestrator.ts`, `dag-utils.ts`, `foundry-heartbeat.ts`) have grown in complexity with custom lifecycle transitions, status checks, late-binding graph resolutions, deadlock detection, and session management.

To keep Foundry maintainable, robust, and extensible, we need to explore formal architectural patterns and helper libraries—such as state machine libraries (e.g., XState) and graph processing libraries (e.g., Graphology or custom DAG engines)—and introduce formal Architecture Decision Records (ADRs) to guide its long-term structure.

Furthermore, code quality and extensibility require continuous proactive exploration from a code architecture perspective (similar to how the Visionary persona continuously explores product and user features). Therefore, we propose creating a new scheduled persona: **`architect_visionary` / Code Architect** (or **Techno-Visionary**), which runs on a weekly schedule to perform wide-angle codebase explorations specifically focused on technical debt, modularity, design patterns, and future extensibility.

---

## Core Pillars & Key Objectives

### 1. Engine & Lifecycle Rearchitecture (State Machine & Graph Formalization)
- **State Machine Integration:** Evaluate replacing ad-hoc status transition logic with a formal state machine library (e.g. XState) to model Node lifecycle transitions (`PENDING -> READY -> ACTIVE -> VERIFYING -> COMPLETED/FAILED`) and handle edge-case triggers cleanly.
- **Graph / DAG Engine Abstraction:** Evaluate graph management libraries to encapsulate topological sorting, cycle detection, critical path calculation, and parent-child DAG cascading operations in modular, well-tested units.
- **Architectural Research & ADRs:**
  - Conduct research into modularizing `.github/scripts/foundry-orchestrator.ts` into distinct subsystems (Scheduler, State Machine, Graph Resolver, GitHub API Adapter, Telemetry).
  - Draft formal ADRs (e.g., `adr-153-foundry-state-machine-and-dag-engine.md`) detailing chosen patterns, library benchmarks, and architectural blueprints for Foundry's future.

### 2. Scheduled Weekly Persona: Code Architect / Refactoring Visionary
- **Persona Role & Scope:**
  - **Identity:** Technical counterpart to the product `visionary` persona. Focuses strictly on code architecture, DX, performance, testability, and refactoring opportunities rather than product/user-facing features.
  - **Weekly Schedule:** Runs once a week via GitHub Actions (`.github/workflows/schedule-code-architect.yml`).
  - **Outputs:** Strictly produces new `IDEA` nodes (e.g., refactoring ideas, architectural improvements, library migrations, test infrastructure enhancements) for Product/Architect review.
- **Safety & Agile Guardrails:**
  - Operating in a safe agile environment, this persona only proposes structured nodes for standard design, prioritization, and execution pipelines rather than modifying core application code directly.

---

## Acceptance Criteria
- [x] Product Manager: Breakdown this idea into a detailed PRD (`prd-153-foundry-rearchitecture-and-code-architect-persona`).
- [ ] prd-153-521-foundry-rearchitecture-and-code-architect-persona
- [ ] Architect: Draft ADRs detailing state machine (XState) and DAG graph library options for `.github/scripts/`.
- [ ] Tech Lead: Define schema updates in `.github/scripts/schema.ts` and workflow configuration in `.github/workflows/schedule-code-architect.yml` for the new weekly Code Architect persona.
