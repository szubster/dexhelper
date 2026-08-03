---
id: idea-133-automated-dag-visualizer
type: IDEA
title: Automated DAG Visualizer via Mermaid Generation
status: PENDING
owner_persona: product_manager
created_at: "2026-08-03"
updated_at: "2026-08-03"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - orchestrator
  - tooling
  - visualization
rejection_count: 0
notes: "Proposed to improve the developer experience and observability of the Foundry Orchestrator."
---

# Idea: Automated DAG Visualizer via Mermaid Generation

## Context
The Foundry system generates a significant number of nodes (IDEA, PRD, EPIC, STORY, TASK, etc.) connected by dependencies (`depends_on`). As the node graph scales, it becomes increasingly difficult for human maintainers (like the CEO or mechanic persona) to visualize the state of the active pipeline, spot deadlocks, or understand the critical path.

## Proposal
Implement an automated utility that parses all active nodes in the `.foundry` directory and generates a [Mermaid.js diagram](https://mermaid.js.org/) representing the current state of the Directed Acyclic Graph (DAG).
- Nodes would be colored or styled based on their `status` (e.g., PENDING, READY, ACTIVE, COMPLETED, FAILED).
- The utility could output a `DAG_STATE.md` file containing the Mermaid diagram, which GitHub renders natively.
- This could be integrated into the TPM persona's hourly run or provided as a standalone CLI tool for developers.

## Value Proposition
This directly improves the observability of the Foundry's internal processes. It helps debug orchestrator issues (like circular dependencies or stuck nodes) by providing a clear visual representation of the active work, rather than forcing maintainers to `grep` through YAML files.

## Next Steps
- [ ] Product Manager: Draft a PRD outlining the technical requirements and rendering output format for the Mermaid visualizer.