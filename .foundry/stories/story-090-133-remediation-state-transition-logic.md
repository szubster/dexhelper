---
id: story-090-133-remediation-state-transition-logic
type: STORY
title: Remediation State Transition Logic for Zombie Nodes
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-14'
updated_at: '2026-06-28'
depends_on:
  - epic-050-089-zombie-node-detection-engine
jules_session_id: '6818854889538091671'
pr_number: null
parent: epic-050-090-zombie-node-remediation-and-gc
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Remediation State Transition Logic for Zombie Nodes

## Objective
Implement functionality to safely update the YAML frontmatter of identified zombie nodes, changing `status: ACTIVE` to `status: FAILED`.

## Context
Following the detection of "zombie" nodes (nodes incorrectly stuck in the `ACTIVE` state) by the engine developed in `epic-050-089-zombie-node-detection-engine`, the system must remediate them by transitioning their state to `FAILED`. This allows the existing Resurrection Loop to pick them up and retry them.

## Acceptance Criteria
- [ ] Create task breakdown.

### Next Steps
- [ ] Break down into Tasks.
