---
id: task-516-528-owner-persona-mapping-impl
type: TASK
title: Implement Base Prompt Mapping Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '6783906317075216272'
pr_number: null
parent: story-418-516-orchestrator-prompt-resolution
tags:
  - foundry
  - orchestrator
  - prompt-resolution
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Implement Base Prompt Mapping Logic

## Description
Implement the logic to map `owner_persona` to the appropriate base prompt fragment in the Orchestrator.
The logic should load the correct generic or specific persona prompt file from `.github/agents/`.

## Acceptance Criteria
- [x] Implement `owner_persona` extraction from the node frontmatter (defaulting to `auditor` if status is `VERIFYING`).
- [x] Implement logic to load `.github/agents/generic/${ownerPersona}.md` or fallback to `.github/agents/${ownerPersona}.md`.
- [x] Handle cases where the persona prompt does not exist gracefully.
