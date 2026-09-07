---
id: idea-156-automated-graph-healing
type: IDEA
title: Automated Graph Healing for BLOCKED Nodes
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-19'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '4886904670993063990'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - dag
  - self-healing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Automated Graph Healing for BLOCKED Nodes

## Context & Problem Statement
The Foundry DAG Orchestrator strictly enforces dependency ordering via the `depends_on` array. When human intervention or persona mistakes cause circular dependencies or reference non-existent node files, the orchestrator detects this and flags the affected nodes as `BLOCKED`.

Currently, resolving a `BLOCKED` state requires a human or manual `tpm` intervention to decipher the DAG cycle, locate the offending file, and push a git patch to fix the `depends_on` array. As the multi-agent pipeline scales, these deadlocks become a primary bottleneck to full autonomy.

## Proposed Idea
Introduce an "Automated Graph Healing" sub-routine (potentially mapping to the existing `mechanic` persona, or a new "Graph Healer").
When the orchestrator encounters nodes in a `BLOCKED` state (due to cycles or unresolvable paths), it triggers a dedicated repair workflow.
1. **Diagnosis:** A script runs a topological sort to isolate the exact circular path or missing reference.
2. **AI Resolution:** An LLM agent is spun up, provided with the diagnosis output, and instructed to analyze the `depends_on` links. It decides which link is logically incorrect (e.g. a Task depending on itself, or two siblings cross-depending).
3. **Patch Application:** The agent automatically modifies the frontmatter to break the cycle or remove the invalid reference, then submits a PR.

This pushes the autonomous factory closer to true self-healing, minimizing human bottlenecking during pipeline jams.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature request.
- [ ] Product Manager: Convert this IDEA into a PRD outlining the exact topological sort algorithms and the prompts required for the graph healing LLM.
