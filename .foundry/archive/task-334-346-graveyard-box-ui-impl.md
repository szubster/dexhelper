---
id: task-334-346-graveyard-box-ui-impl
type: TASK
title: Graveyard Box UI Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-334-graveyard-box-ui
tags:
  - feature
  - nuzlocke
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Graveyard Box UI Implementation

## Objective
Implement a UI setting to allow users to designate a specific PC box as the Graveyard Box.

## Contract / Acceptance Criteria
- [x] Create a UI component/setting for Graveyard Box selection (or verify it exists, as it seems present in `SettingsControls`).
- [x] Connect the UI setting to the backend state (it appears to be connected in `SettingsModal`).
- [x] Strictly adhere to the tactical hardware/snooping design constraint for all UI components.

## Instructions & Reminders for Coder
- **Note:** This functionality appears to already exist in `src/components/settings/SettingsControls.tsx` and `src/components/SettingsModal.tsx`. Ensure everything works as expected and submit an Empty PR checking off all Acceptance Criteria if no code changes are needed.
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Constants:** If any memory offsets or save file parsing are required for this, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
