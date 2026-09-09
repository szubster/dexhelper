---
id: prd-153-521-foundry-rearchitecture-and-code-architect-persona
type: PRD
title: >-
  PRD: Foundry Rearchitecture - State Machine/Graph Libraries & Scheduled Code
  Architect Persona
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '17437175947743572753'
pr_number: null
parent: idea-153-foundry-rearchitecture-and-code-architect-persona
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

# PRD: Foundry Rearchitecture - State Machine/Graph Libraries & Scheduled Code Architect Persona

## Overview
This PRD outlines the requirements for rearchitecting the Foundry orchestrator and DAG resolution engine using formal state machine and graph processing libraries. It also introduces a new scheduled persona, the Code Architect (`architect_visionary`), responsible for proactively exploring codebase technical debt, modularity, and future extensibility on a weekly basis.

## Requirements

### 1. Engine & Lifecycle Rearchitecture (State Machine & Graph Formalization)
- **State Machine Library Evaluation:** Evaluate and select a formal state machine library (e.g., XState) to handle Node lifecycle transitions (`PENDING -> READY -> ACTIVE -> VERIFYING -> COMPLETED/FAILED`).
- **Graph/DAG Engine Abstraction:** Evaluate and select a graph processing library (e.g., Graphology) to encapsulate topological sorting, cycle detection, and parent-child DAG operations.
- **Architectural Documentation (ADR):** The chosen patterns and library benchmarks must be documented in a formal Architecture Decision Record (ADR).

### 2. Scheduled Weekly Persona: Code Architect (`architect_visionary`)
- **Persona Responsibilities:** The Code Architect will focus on code quality, DX, performance, testability, and refactoring opportunities, producing `IDEA` nodes for review.
- **Scheduling:** The persona must run weekly via a GitHub Actions workflow (`.github/workflows/schedule-code-architect.yml`).
- **Schema Integration:** The persona must be formally defined within the Foundry schema configuration (`.github/scripts/schema.ts`).

## Acceptance Criteria
- [x] Epic Planner: Break down this PRD into detailed EPIC nodes covering the orchestrator rearchitecture and the introduction of the Code Architect persona.
- [ ] epic-521-540-foundry-rearchitecture-state-graph
- [ ] epic-521-541-code-architect-persona
