---
id: task-317-322-detect-party-zero-hp-impl
type: TASK
title: Detect Party Zero HP Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-317-detect-party-zero-hp
tags:
  - feature
  - nuzlocke
  - verification
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Detect Party Zero HP Implementation

## Objective
Implement logic to detect Pokémon currently at 0 HP in the party as dead.

## Scope
- Implement logic to check HP of party Pokémon and mark those with 0 HP as dead for the Nuzlocke Tracker.
- Ensure the state updates correctly when a Pokémon dies in the party.
- Self-verify the changes (no separate QA task required).

## Technical Blueprint & Contract
- **Memory Offsets**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Gen 3 Save Parsing**: When parsing Gen 3 save files, you MUST use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement logic to mark party Pokémon with 0 HP as dead.
- [x] Verify the state updates correctly upon party Pokémon death.
- [x] Ensure all memory offsets are defined as module-level constants.
- [x] Ensure Gen 3 save parsing uses resolved section offsets.
- [x] Self-verify the changes and document the outcome.
