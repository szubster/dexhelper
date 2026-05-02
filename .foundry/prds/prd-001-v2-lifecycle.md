---
id: prd-001-v2-lifecycle
type: PRD
title: 'Foundry V2: Atomic Handoffs & Single-Persona Ownership Lifecycle'
status: "COMPLETED"
owner_persona: epic_planner
created_at: '2026-04-21'
updated_at: "2026-05-02"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-003-atomic-handoff-foundation.md
tags:
  - v2-architecture
  - lifecycle
---

# PRD: Foundry V2: Atomic Handoffs & Single-Persona Ownership Lifecycle

## Executive Summary

The Foundry V1 infrastructure allowed for "Composite Nodes," where a single markdown file could act as a container for tasks spanning multiple personas. This architecture introduced a critical flaw: **DAG Deadlocks**. The orchestrator could not mark a composite node as `COMPLETED` until all included persona tasks were finished, effectively blocking downstream nodes that only depended on a specific persona's subset of work.

This PRD formalizes the transition to **Atomic Handoffs**, enforcing the single-persona ownership invariant. By ensuring that every file (node) has exactly one owner persona, the DAG stays fluid, unblocked, and can be efficiently orchestrated for maximum parallelism.

## 1. Core Principles

- **Atomic Ownership:** Every node MUST have exactly one `owner_persona`. Responsibilities must not leak across different personas within the same file.
- **Automated Completion Lifecycle:** Status transitions are managed by the orchestrator and heartbeat system based on Git activities (e.g., Pull Request merges), rather than manual edits by personas.
- **Clean Decoupling:** When a workflow requires a transition of responsibility from one persona to another, the active persona delivers their output as one or more *new* nodes (files) and concludes their session.

## 2. Formal Transition Requirements (Lifecycle Pipeline)

To enforce Atomic Handoffs, the product lifecycle pipeline is strictly defined as follows:

### 2.1 IDEA → PRD
- **Input Node:** `.foundry/ideas/idea-<slug>.md`
- **Owner Persona:** `product_manager`
- **Deliverable:** The Product Manager translates the raw idea into a formal `.foundry/prds/prd-<slug>.md`.
- **Handoff:** The PRD node explicitly declares a `depends_on` array containing the parent `IDEA` node path. The PM submits the new PRD file via a PR. Upon merge, the orchestrator triggers and updates dependencies.

### 2.2 PRD → EPIC
- **Input Node:** `.foundry/prds/prd-<slug>.md`
- **Owner Persona:** `epic_planner`
- **Deliverable:** The Epic Planner breaks down the PRD into logical, macroscopic functional chunks (Epics), creating multiple `.foundry/epics/epic-<slug>.md` files.
- **Handoff:** Each Epic must explicitly reference the originating PRD in its `depends_on` array. The Epic Planner opens a PR with the new Epics. The Epic Planner is also responsible for mapping out the topological dependencies *between* the newly generated Epics themselves, avoiding future deadlocks.

### 2.3 EPIC → STORY
- **Input Node:** `.foundry/epics/epic-<slug>.md`
- **Owner Persona:** `story_owner`
- **Deliverable:** The Story Owner actively monitors ready and in-progress Epics, creating incremental `.foundry/stories/story-<slug>.md` files. This is a dynamic, late-binding process to incorporate learnings.
- **Handoff:** Stories use the `depends_on` field to enforce sequential execution if necessary (e.g., `Story 2` depends on `Story 1`). They also use the optional `parent` field to reference the parent Epic for context hydration, keeping the DAG unblocked while ensuring context continuity.

### 2.4 STORY → TASK
- **Input Node:** `.foundry/stories/story-<slug>.md`
- **Owner Persona:** `tech_lead`
- **Deliverable:** The Tech Lead reads the Story and applicable ADRs, transforming the product requirements into concrete engineering blueprints by creating `.foundry/tasks/task-<slug>.md` files.
- **Handoff:** Tasks are placed in the orchestrator pipeline. They `depend_on` the parent Story or other prerequisite Tasks.

### 2.5 TASK IMPLEMENTATION & VALIDATION
- **Input Node:** `.foundry/tasks/task-<slug>.md`
- **Owner Personas:** `coder` (Implementation), `qa` (Validation)
- **Deliverable:**
    - The `coder` implements the technical spec outlined in the Task, directly committing code changes.
    - The `qa` persona validates the implementation against the technical contract, producing new test coverage, documentation updates, or new Tasks/Stories/PRDs based on uncovered findings.
- **Handoff:** Task nodes are uniquely constrained. Both `coder` and `qa` act on the task definition, but the task node itself does not move to a new file. Instead, the task is marked `COMPLETED` when the PR resolving the implementation is merged.

## 3. Success Metrics
- **0 Composite Nodes:** No markdown node contains action items for multiple personas.
- **Increased Parallelism:** Reduction in orchestration queue wait times by eliminating unnecessary DAG deadlocks.
- **Clear Traceability:** Every artifact in the project cleanly points to its direct upstream dependency via the `depends_on` property.

## 4. Next Steps
- [x] **Epic Planner:** Break down this PRD into Epics mapping out the necessary schema/doc updates, orchestration script refactors, and test coverage expansions to fully support Atomic Ownership.

### Generated Epics
- `.foundry/epics/epic-007-atomic-handoff-schema.md`
- `.foundry/epics/epic-008-atomic-handoff-orchestrator.md`
- `.foundry/epics/epic-009-atomic-handoff-testing.md`
