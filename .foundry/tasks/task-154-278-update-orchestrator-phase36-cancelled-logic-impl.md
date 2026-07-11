---
id: task-154-278-update-orchestrator-phase36-cancelled-logic-impl
type: TASK
title: Update Orchestrator Phase 3.6 Cancelled Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-096-154-parent-awakening-logic
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Orchestrator Phase 3.6 Cancelled Logic

## Overview
Update Phase 3.6 of `.github/scripts/foundry-orchestrator.ts` to expand the condition `node.frontmatter.status === 'FAILED'` to include `CANCELLED` nodes with a `rejection_reason`.

## Acceptance Criteria
- [x] Locate Phase 3.6 in `.github/scripts/foundry-orchestrator.ts`.
- [x] Expand the condition checking for `FAILED` status and `rejection_reason` to also include `CANCELLED` nodes with a `rejection_reason`.

**Note for Coder:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
