---
id: idea-423-foundry-dry-run-simulator
type: IDEA
title: Foundry DAG Dry-Run Simulator and Deadlock Detector
status: PENDING
owner_persona: product_manager
created_at: '2025-01-24'
updated_at: '2025-01-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - simulation
  - tooling
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Foundry DAG Dry-Run Simulator and Deadlock Detector

## Context
As the Foundry DAG grows in complexity and agents dynamically spawn deeply nested child nodes (e.g., late-binding `RESEARCH` or `ADR` nodes, decomposing `STORY` nodes into multiple `TASK` nodes), the risk of creating architectural deadlocks increases. Currently, errors such as circular dependencies or unresolved `depends_on` paths are typically only caught *after* a PR is merged and the orchestrator attempts to resolve the active graph, causing nodes to become stuck in a `PENDING` or `BLOCKED` state.

## Proposal
Implement a "Dry-Run Simulator" for the Foundry Orchestrator that can be executed as a GitHub Actions PR check (or run locally via a CLI tool).
- **DAG Validation:** The simulator will parse the entire `.foundry/` directory (including the changes in the current branch/PR) and build the complete dependency graph.
- **Deadlock Detection:** It will run cycle detection algorithms (e.g., Tarjan's strongly connected components algorithm) to identify circular dependencies before they are merged.
- **Path Resolution:** It will verify that every file referenced in a `depends_on` array or `parent` field actually exists and is spelled correctly.
- **Simulation Run:** It will perform a fast, simulated traversal of the graph (mocking node completions) to ensure all nodes can theoretically reach the `COMPLETED` state without getting orphaned.

## Value Proposition
This significantly improves the robustness of the Foundry system. By catching DAG configuration errors during the PR review phase, we prevent the orchestrator from stalling in production, reduce the need for manual intervention by the `tpm` or human maintainers, and ensure a smoother flow for autonomous agents.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD detailing the simulator's checks and GitHub Actions integration.
- [ ] prd-423-001-foundry-dry-run-simulator
