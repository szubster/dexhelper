---
id: task-274-302-gen3-lottery-ui-integration-qa
type: TASK
title: Gen3 Lottery UI Integration - QA
status: CANCELLED
owner_persona: qa
created_at: '2026-07-10'
updated_at: '2026-07-28'
depends_on:
  - task-274-301-gen3-lottery-ui-integration-impl
jules_session_id: null
pr_number: null
parent: story-133-274-gen3-lottery-ui-integration
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-274-301-gen3-lottery-ui-integration-impl
notes: ''
---

# Gen3 Lottery UI Integration - QA

## Goal
Verify the lottery matching logic is correctly integrated into the UI state and exposes the best match to the dashboard.

## Requirements
- Verify that a selector or context hook correctly exposes the best lottery match.
- Verify that the exposed state includes: Winning Number, Best Match Pokémon, OT ID, Matched Digits, Prize Tier.

## Failure Rules & Instructions (QA Persona)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Selector or context hook is verified to expose lottery state correctly.
- [ ] Exposed state is verified to include Winning Number, Best Match Pokémon, OT ID, Matched Digits, and Prize Tier.
