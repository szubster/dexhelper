---
id: adr-570-551-graph-processing-library-evaluation
type: ADR
title: Graph Processing Library Evaluation for DAG Operations
status: COMPLETED
owner_persona: architect
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-560-570-evaluate-graph-processing-libraries
tags:
  - foundry
  - architecture
  - dag
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR: Graph Processing Library Evaluation for DAG Operations

## Context
The Foundry orchestrator relies on complex Directed Acyclic Graph (DAG) operations to determine node dependencies, calculate in-degrees, and manage the progression of tasks across the autonomous software factory. Currently, these operations are handled by custom scripts and utility functions. As the scale and complexity of the DAG increases, we need to evaluate whether adopting a dedicated graph processing library (such as Graphology or Dagre) is beneficial. We currently use `dagre` in the UI to statically layout graphs, but there is an ongoing effort to remove it (see IDEA-418).

## Decision
We evaluated `Graphology` and `dagre`.
- `dagre` is primarily a layout engine for directed graphs, heavily focused on visual representations (like React Flow), making it less suitable as a pure data-structure graph processing library for the orchestrator backend. Furthermore, there is an active effort to remove it.
- `Graphology` is a robust, multi-purpose graph data structure library for JavaScript, offering extensive algorithms for traversal, metrics, and manipulation. However, it adds a large dependency footprint and overhead.
- Our current orchestrator implementation in `.github/scripts/foundry-orchestrator.ts` successfully manages the DAG state using lightweight, custom graph traversal algorithms tailored specifically for our file-based Markdown node system.

**Decision:** We will **not** adopt `Graphology` or any heavy external graph processing library for the core Foundry orchestrator at this time. The orchestrator will continue to use its bespoke, lightweight dependency resolution logic, as it accurately handles our specific filesystem-based DAG schema without the overhead of translating the file system state into a complex library-specific graph object first.

## Consequences
- **Positive:** We maintain a lightweight orchestration script with fewer external dependencies, keeping CI runs fast.
- **Positive:** The custom implementation remains tightly coupled to our unique `.foundry/**/*.md` file structure and YAML frontmatter requirements.
- **Negative:** We miss out on some advanced, pre-built graph algorithms (e.g., complex cycle detection algorithms out-of-the-box), but our current custom deadlock detection is sufficient for our DAG scale.
