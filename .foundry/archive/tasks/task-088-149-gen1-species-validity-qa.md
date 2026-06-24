---
id: task-088-149-gen1-species-validity-qa
type: TASK
title: QA Gen 1 species validity check
status: COMPLETED
owner_persona: qa
created_at: '2026-06-04'
updated_at: '2026-06-11'
depends_on: []jules_session_id: null
pr_number: null
parent: story-051-088-gen1-species-validity
tags:
  - feature
  - gen2
  - trade
  - tool
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 1 species validity check

## Objective
Verify the implementation of the Generation 1 species validity check.

## Verification Steps
- Check that the function correctly identifies Gen 1 species (IDs 1-151) and rejects others.
- Ensure that unit tests exist and cover edge cases.
- Run `pnpm test` to confirm tests pass.
- Run `pnpm type-check` to confirm no type regressions.

## Notes for QA
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you reject the Coder's implementation, update the target task's `status` to `FAILED` and provide a `rejection_reason`, and increment its `rejection_count`. Update the markdown body of this task to reflect the rejection.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Functionality verified.
- [x] Tests verified.
