---
id: task-269-263-detect-party-zero-hp-impl
type: TASK
title: Implement logic to detect party zero HP as dead
status: COMPLETED
owner_persona: coder
created_at: '2026-07-05'
updated_at: '2026-07-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-269-detect-party-zero-hp
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement logic to detect party zero HP as dead

## Context
We need to implement logic to detect Pokémon in the party with 0 HP and mark them as dead as part of the Automated Nuzlocke Tracker.

## Implementation Details
1. Review the `src/engine/nuzlocke/tracker.ts` file.
2. Ensure there is a function (e.g., `getDeadPokemon`) that correctly extracts party Pokémon that have fainted (HP is 0).
3. If the logic is already complete and tested, use the Empty PR policy to complete this task by explicitly checking off all Acceptance Criteria checkboxes and submitting an empty PR (0 files changed).
4. As this is a simple, low-risk task, the Coder is expected to self-verify their work and document it in their journal, per the Intelligent Verification Protocol.

## Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Logic for detecting party Pokémon with 0 HP as dead is implemented and tested.
