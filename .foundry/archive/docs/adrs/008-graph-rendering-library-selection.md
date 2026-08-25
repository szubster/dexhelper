---
id: adr-008-graph-rendering-library-selection
type: ADR
title: 'ADR 008: Graph Rendering Library Selection'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-12'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 008: Graph Rendering Library Selection

## Date
2026-05-12

## Status
Accepted

## Context
We are building a DAG Dashboard Visualization & UI for the Foundry nodes. We need a graph rendering library capable of displaying the node states and dependencies with moderate node counts.
A primary constraint is the UI must adhere strictly to our 'tactical hardware/snooping' aesthetic. This means sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts, avoiding generic visual patterns like soft shadows or rounded corners.

*Exception:* The `rounded-full` utility class is explicitly allowed exclusively for physical hardware screws/mount points, targeting rings/crosshairs/radar pings, and small LED-style status indicator dots, as these specifically enhance the tactical hardware aesthetic. General rounded corners for structural UI elements remain strictly forbidden.

We evaluated three popular graph rendering libraries:
1. **Mermaid.js**: Excellent for simple, text-based graph definition. However, it offers limited flexibility for highly custom styling (specifically enforcing our strict tailwind-driven aesthetic) and lacks advanced native interactivity features (like custom node filtering or click-to-highlight dependency chains) without significant workarounds.
2. **Cytoscape.js**: Highly performant and feature-rich, capable of handling very large graphs. However, it operates on a canvas/WebGL level, making it difficult to integrate directly with our React component hierarchy and use our existing Tailwind CSS utility classes natively.
3. **React Flow**: A highly customizable React-based library for building node-based applications. It natively supports custom React components as nodes, allowing us to seamlessly apply our Tailwind CSS utility classes and enforce the tactical aesthetic. It also has excellent built-in interactivity (panning, zooming) and API hooks for implementing custom behaviors like highlighting dependencies.

## Decision
We select **React Flow** as the graph rendering library for the DAG Dashboard.

## Consequences
- **Positive:** We can natively use Tailwind CSS to perfectly match the required 'tactical hardware/snooping' aesthetic on all custom nodes.
- **Positive:** Deep integration with our React ecosystem makes state management and interactivity (filtering, highlighting) straightforward.
- **Negative:** React Flow renders nodes as DOM elements, which may have performance limitations if the node count grows exceptionally large (e.g., into the thousands) compared to a canvas-based solution like Cytoscape.js. However, for our expected moderate node counts, performance will be acceptable.
