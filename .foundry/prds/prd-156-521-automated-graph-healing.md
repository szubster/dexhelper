---
id: prd-156-521-automated-graph-healing
type: PRD
title: PRD Automated Graph Healing for BLOCKED Nodes
status: READY
owner_persona: epic_planner
created_at: '2026-08-19'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-156-automated-graph-healing
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

# PRD: Automated Graph Healing for BLOCKED Nodes

## 1. Context & Problem Statement
The Foundry DAG Orchestrator strictly enforces dependency ordering via the `depends_on` array. When human intervention or persona mistakes cause circular dependencies or reference non-existent node files, the orchestrator detects this and flags the affected nodes as `BLOCKED`. Currently, resolving a `BLOCKED` state requires a human or manual `tpm` intervention to decipher the DAG cycle, locate the offending file, and push a git patch to fix the `depends_on` array. As the multi-agent pipeline scales, these deadlocks become a primary bottleneck to full autonomy.

## 2. Proposed Idea
Introduce an "Automated Graph Healing" sub-routine (potentially mapping to the existing `mechanic` persona, or a new "Graph Healer").
When the orchestrator encounters nodes in a `BLOCKED` state (due to cycles or unresolvable paths), it triggers a dedicated repair workflow.
1. **Diagnosis:** A script runs a topological sort to isolate the exact circular path or missing reference.
2. **AI Resolution:** An LLM agent is spun up, provided with the diagnosis output, and instructed to analyze the `depends_on` links. It decides which link is logically incorrect (e.g. a Task depending on itself, or two siblings cross-depending).
3. **Patch Application:** The agent automatically modifies the frontmatter to break the cycle or remove the invalid reference, then submits a PR.

This pushes the autonomous factory closer to true self-healing, minimizing human bottlenecking during pipeline jams.

## 3. Product Requirements
1. The DAG Orchestrator (`foundry-orchestrator.ts`) must be updated to output a specific, machine-readable "BLOCKED Diagnosis" artifact when circular dependencies or unresolvable node paths are detected.
2. A new GitHub Action or workflow step must be created to trigger a dedicated `graph_healer` (or `mechanic`) agent session exclusively when the orchestrator produces a BLOCKED Diagnosis artifact.
3. A new system persona prompt (`.github/agents/graph_healer.md`) must be created, specifically tuned to analyze the BLOCKED Diagnosis artifact, determine the logically incorrect dependency link, and patch the offending Markdown files.
4. The `graph_healer` agent must be capable of modifying YAML frontmatter specifically to break dependency cycles, and must open a PR to resolve the blockage.
5. Extensive unit tests must be added to verify the orchestrator correctly outputs the diagnosis artifact.
6. A test workflow must be added to verify the end-to-end healing process on a mocked cyclic dependency graph.

## 4. Technical Specifications

### 4.1 Topological Sort Algorithm for Diagnosis
To accurately diagnose the exact circular path or missing reference causing the `BLOCKED` state, the orchestrator will utilize Kahn's algorithm or a Depth-First Search (DFS) based topological sort.

**Detailed Algorithm (DFS based approach):**
1. Initialize three sets for tracking node states: `unvisited`, `visiting`, and `visited`.
2. Iterate through every node in the DAG graph.
3. For each node, if it is in `unvisited`, perform a DFS traversal.
4. In the DFS step:
   - Mark the current node as `visiting`.
   - Iterate through its dependencies (from `depends_on` array and `parent` relationship).
   - If a dependency is missing from the graph (unresolvable path), record a "Missing Reference Error" for this node and dependency pair.
   - If a dependency is in `visiting`, a cycle is detected. The traversal path from the current node back to the repeated dependency represents the exact circular path. Record a "Circular Dependency Error" with the full path of the cycle.
   - If a dependency is in `unvisited`, recursively call DFS on it.
   - If a dependency is in `visited`, skip it.
5. After checking all dependencies, move the current node from `visiting` to `visited`.
6. Compile all recorded errors into the machine-readable "BLOCKED Diagnosis" artifact (e.g., a JSON file containing the types of errors and the involved node paths).

### 4.2 Prompts for Graph Healing LLM Agent
The `graph_healer` agent will need specific instructions to analyze the diagnosis artifact and propose a fix.

**System Prompt Overview:**
You are the `graph_healer`, an expert system mechanic responsible for maintaining the health of the Foundry DAG Orchestrator graph. Your task is to resolve DAG deadlocks, specifically circular dependencies and unresolvable missing references identified in the BLOCKED Diagnosis artifact.

**Instruction Prompt for Resolving Circular Dependencies:**
- Analyze the provided cycle path. Identify the nodes involved.
- Determine which dependency link is the most logically incorrect. Common causes include:
  - A task mistakenly depending on itself.
  - Sibling tasks depending on each other instead of sequentially or in parallel.
  - A parent node depending on its child (the child should depend on the parent, or the parent waits via the PENDING state).
- Formulate a patch to modify the YAML frontmatter of the offending node(s) to remove the incorrect dependency from the `depends_on` array or correct the `parent` field.
- Explain the logic behind your chosen fix in the PR description.

**Instruction Prompt for Resolving Missing References:**
- Analyze the missing reference error. Identify the node and the unresolvable path it depends on.
- Check if the missing path is due to a simple typo, incorrect directory, or if the target node genuinely doesn't exist.
- Formulate a patch to correct the path in the `depends_on` array if it's a typo, or remove the dependency entirely if the target node is invalid and not crucial.
- Explain the logic behind your chosen fix in the PR description.

## 5. Acceptance Criteria
- [ ] Epic Planner: Draft the EPIC for implementing Automated Graph Healing.
