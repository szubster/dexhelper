---
id: epic-050-089-zombie-node-detection-engine
type: EPIC
title: Zombie Node Detection Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-06-15'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-079-050-foundry-zombie-node-cleanup
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Zombie Node Detection Engine

## 1. Description
This Epic implements the detection mechanism for identifying "zombie" nodes in the Foundry DAG. As decided, this logic will be integrated directly into the primary orchestrator script (`.github/scripts/foundry-orchestrator.ts`) to ensure automated, self-healing functionality without requiring standalone TPM intervention.

The engine will sweep the `.foundry` directory for nodes currently in the `ACTIVE` state, extract their `jules_session_id`, and verify liveliness by cross-referencing this ID with the GitHub Actions API.

## 2. Prerequisites
- Familiarity with the `.github/scripts/foundry-orchestrator.ts` script.
- Understanding of the Foundry Node YAML frontmatter structure.
- GitHub Actions API access and authentication for checking workflow status.

## 3. High-Level Acceptance Criteria
- [ ] Direct orchestrator integration is selected as the implementation approach.
- [ ] Sweep logic correctly identifies all nodes in the `ACTIVE` state.
- [ ] Detection logic correctly identifies invalid (e.g., null) `jules_session_id`s for `ACTIVE` nodes.
- [ ] Integration with the GitHub API correctly determines if the workflow run associated with the `jules_session_id` has completed (success, failure, or cancelled).
- [ ] Unit tests are implemented covering the sweep and detection logic.

## 4. Next Steps (Stories)
- [ ] Create Story for sweeping ACTIVE nodes and detecting invalid session IDs.
- [ ] Create Story for GitHub API integration to verify workflow liveliness.
