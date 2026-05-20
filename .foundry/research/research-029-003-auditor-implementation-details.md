---
id: research-029-003-auditor-implementation-details
type: RESEARCH
title: Research Auditor Implementation Details
status: READY
owner_persona: researcher
created_at: '2026-05-20'
updated_at: '2026-05-20'
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
- [ ] Determine orchestrator script changes.
- [ ] Draft new persona prompt.
- [ ] Document any edge cases or implications discovered during research.
