---
id: adr-571-graph-processing-libraries-evaluation
type: ADR
title: 'ADR 571: Graph Processing Libraries for DAG Operations'
status: COMPLETED
owner_persona: architect
created_at: '2026-09-13'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
  - dag
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 571: Graph Processing Libraries for DAG Operations

## Date
2026-09-13

## Status
Accepted

## Context
The Foundry orchestrator relies heavily on Directed Acyclic Graph (DAG) structures to manage and execute node workflows (ideas, epics, stories, tasks). Currently, DAG operations (like topological sorting, cycle detection, and sibling dependency enforcement) are implemented directly in the orchestrator script using custom algorithms.

As the Foundry scales, we need a more robust and feature-complete graph processing library to handle these operations efficiently and correctly, while minimizing custom maintenance overhead. We specifically require a library that handles graph traversal and analysis (not rendering, which is covered by ADR 008).

We evaluated the following graph processing libraries:

1. **Graphology**: A robust and multipurpose graph theory library for JavaScript and TypeScript. It offers a rich set of features including cycle detection, topological sorting, shortest path algorithms, and various graph metrics. It is highly modular and performant.

2. **graphlib**: A widely used library that powers the Dagre layout engine. It provides essential DAG operations, but it has not seen significant updates in years and lacks modern TypeScript support out-of-the-box, which is a major drawback given our strict TypeScript environment.

3. **Custom Implementation (Current state)**: Maintaining our own graph algorithms in `.github/scripts/foundry-orchestrator.ts`. While this ensures zero dependencies, it requires significant ongoing maintenance and is prone to edge-case bugs as DAG complexity increases.

## Decision
We select **Graphology** as the primary graph processing library for DAG operations within the Foundry orchestrator.

## Consequences
- **Positive:** We gain access to a well-tested, feature-rich graph processing library, significantly reducing the maintenance burden of custom algorithms.
- **Positive:** Graphology has excellent modern TypeScript support and is actively maintained.
- **Positive:** It provides built-in functions for complex operations like cycle detection and topological sorting, which are critical for the orchestrator.
- **Negative:** Introduces a new external dependency into the orchestrator script environment.
