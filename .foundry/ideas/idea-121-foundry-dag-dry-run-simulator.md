---
id: idea-121-foundry-dag-dry-run-simulator
type: IDEA
title: Foundry DAG Dry-Run Simulator
status: PENDING
owner_persona: product_manager
created_at: "2024-07-24"
updated_at: "2024-07-24"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - simulation
  - tooling
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Foundry DAG Dry-Run Simulator

## Description
The Foundry DAG orchestrator currently operates directly on the filesystem, transitioning nodes and dispatching agents in real-time. When complex structural changes are needed, it is difficult to predict how these changes will cascade through the DAG. Implementing a "Dry-Run" simulator mode would allow developers and agents to preview the exact sequence of state transitions and task scheduling without executing actual file mutations or triggering agent dispatches.

## Problem Statement
Making structural changes to the Foundry DAG carries the risk of introducing deadlocks, circular dependencies, or orphan nodes. Currently, there is no way to safely validate the execution graph before committing changes, leading to difficult-to-debug pipeline stalls.

## Solution
Create a Dry-Run CLI mode for the orchestrator that loads the current DAG state, accepts a set of hypothetical node modifications, and simulates the orchestration lifecycle. It will output a visual or tabular timeline of node state transitions, highlighting any potential deadlocks or invalid dependencies before actual execution.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD to define the required CLI flags, simulation logic, and output format.
