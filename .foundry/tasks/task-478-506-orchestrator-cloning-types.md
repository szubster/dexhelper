---
id: task-478-506-orchestrator-cloning-types
type: TASK
title: Define Types for Node Cloning and Prompt Variants
status: READY
owner_persona: coder
created_at: '2026-08-30'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - types
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Define Types for Node Cloning and Prompt Variants

## Objective
Define the necessary TypeScript types and interfaces for the new node cloning and prompt adaptation logic in the Orchestrator.

## Scope
1. Define interfaces for tracking cloned node metadata and variant configurations.
2. Define types representing the injected prompt context structure.
3. Update existing orchestrator DAG models to support these new types if necessary.

## Acceptance Criteria
- [ ] Create interfaces/types for variant and cloned node metadata.
- [ ] Export definitions properly to avoid TS6133 unused export warnings.
