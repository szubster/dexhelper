---
id: research-029-003-auditor-implementation-details
type: RESEARCH
title: Research Auditor Implementation Details
status: COMPLETED
owner_persona: researcher
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-060-029-auditor-persona
tags:
  - process
  - orchestrator
  - persona
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Auditor Implementation Details

## Objective
Figure out the exact technical details and required implementation steps to introduce the `auditor` persona and `VERIFYING` state into the Foundry orchestrator and system.

## Scope
- Determine the necessary changes to the Node.js orchestrator script (`.github/scripts/foundry-orchestrator.ts`) to handle the new `VERIFYING` state.
- Define the `auditor` persona prompt (`.github/agents/auditor.md`).
- Figure out exactly how the auditor should spawn downstream nodes dynamically, and the implications of adding this new state to the pipeline.

## Deliverables
- [x] Determine orchestrator script changes.
- [x] Draft new persona prompt.
- [x] Document any edge cases or implications discovered during research.

## Research Findings

### 1. Orchestrator Script Changes (`.github/scripts/foundry-orchestrator.ts`)
- **VALID_STATUSES**: Add `'VERIFYING'` to the list of valid node statuses.
- **Matrix Output Override (CRITICAL)**: In Phase 6 (Collect Phase), when formatting nodes for the JSON matrix output (used to dispatch Jules sessions), the script must check if a node is in the `VERIFYING` state. If it is, the script should dynamically set `owner_persona: 'auditor'` in the JSON object *without* modifying the actual YAML frontmatter in the file. This ensures the `.md` file retains its original owner (e.g., `coder` or `tech_lead`), allowing the Resurrection Loop to correctly re-assign the task back to the original author if the Auditor transitions the node to `FAILED`.
- **Suspension / Incomplete Logic**: The `isHierarchicallyIncomplete` function and related `depends_on` suspension logic must treat `VERIFYING` nodes similarly to `ACTIVE` nodes; they are not `COMPLETED`, so they still block downstream nodes from transitioning to `READY`.

### 2. Heartbeat Script Changes (`.github/scripts/foundry-heartbeat.ts`)
- **Transition to `VERIFYING`**: The `transitionNodeToCompleted` function (or a new equivalent function) must be updated. When a PR is merged (and doesn't have unfulfilled late-binding tasks), instead of mutating the node state to `COMPLETED`, it should mutate the status to `VERIFYING` and clear the `jules_session_id`.
- **Zombie Detection**: The Heartbeat script must monitor `VERIFYING` nodes in its "Pass 1" check exactly as it monitors `ACTIVE` nodes. If an auditor session crashes or times out, it should transition back to `VERIFYING` (ready for another auditor pickup) or `FAILED`, ensuring the auditor step isn't permanently blocked.

### 3. Auditor Persona Prompt (`.github/agents/auditor.md`)
- Drafted a prompt instructing the Auditor to explicitly read contextual docs, evaluate the artifacts against the original intent, extract learnings, and potentially spawn `RESEARCH`, `IDEA`, or `ADR` nodes.
- Instructed the Auditor to submit an empty PR to transition to `COMPLETED` on success, or update the YAML status to `FAILED` with a `rejection_reason` to trigger the Resurrection Loop on failure.

### Edge Cases and Implications
- **Resurrection Loop Handoff**: By keeping the original `owner_persona` in the markdown file and only overriding it in the GitHub Actions matrix output, a `FAILED` node rejected by the auditor will automatically be re-dispatched to the original author (e.g., Coder) because the Orchestrator reads the original frontmatter during the next run.
- **Empty PR Policy Compliance**: The Auditor must execute the Empty PR policy to signify a successful verification, which the orchestrator/heartbeat handles via the standard automerge workflow.
