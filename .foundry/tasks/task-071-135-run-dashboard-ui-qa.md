---
id: task-071-135-run-dashboard-ui-qa
type: TASK
title: QA Dashboard Alive Team View
status: ACTIVE
owner_persona: qa
created_at: '2026-05-22'
updated_at: '2026-05-28'
depends_on:
  - task-071-134-run-dashboard-ui-impl
jules_session_id: '5023324842966507681'
pr_number: null
parent: story-034-071-run-dashboard-ui
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA Dashboard Alive Team View

## Description
QA the "Alive" team view for the Run Dashboard UI.

Validation Failed: The implementation incorrectly uses the Original Trainer Name (`otName`) instead of the Pokémon's nickname. The save parser needs to be updated to extract nicknames, and the UI should use them instead.

## Acceptance Criteria
- [ ] Verify the "Alive" team view displays correctly.
- [ ] Verify the UI meets all requirements for the Nuzlocke Tracker mode.
