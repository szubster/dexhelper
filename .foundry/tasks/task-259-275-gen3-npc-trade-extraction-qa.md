---
id: task-259-275-gen3-npc-trade-extraction-qa
type: TASK
title: QA Gen 3 NPC Trade Extraction
status: READY
owner_persona: qa
created_at: '2026-07-05'
updated_at: '2026-07-10'
depends_on:
  - task-259-274-gen3-npc-trade-extraction-impl
jules_session_id: null
pr_number: null
parent: story-119-259-gen3-npc-trade-parsing
tags:
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 NPC Trade Extraction

## Objective
Verify the Gen 3 NPC Trade Extraction parser implementation.

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail this task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify that no magic numbers are used in the parsing logic for Gen 3 NPC trades.
- [ ] Validate parser correctness against unit tests or mock Gen 3 save data.
