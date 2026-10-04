---
id: task-644-649-orchestrator-confidence-intervention-impl
type: TASK
title: Implement Orchestrator Confidence Intervention Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: '15847124351858294327'
pr_number: null
parent: story-570-644-orchestrator-confidence-intervention-impl
tags:
  - orchestrator
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Orchestrator Confidence Intervention Logic

## Context
Based on PRD-521 and EPIC 570, the orchestrator needs to react to nodes reporting low confidence.

## Requirements
- Modify the Foundry orchestrator (`.github/scripts/foundry-orchestrator.ts`).
- Add a check for `confidence_score` in the YAML frontmatter when a node transitions to COMPLETED or VERIFYING.
- If `confidence_score < 70`, override the standard transition.
- Spawn a QA or Auditor task to review the node.
- Ensure the new logic is covered by unit tests in `.github/scripts/foundry-orchestrator.test.ts`.

## Acceptance Criteria
- [x] Implement the objective as described.
