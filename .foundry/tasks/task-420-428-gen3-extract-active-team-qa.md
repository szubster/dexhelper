---
id: task-420-428-gen3-extract-active-team-qa
type: TASK
title: QA Gen 3 Active Team Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-08-15'
updated_at: '2026-08-18'
depends_on:
  - task-420-427-gen3-extract-active-team-impl
jules_session_id: '16532953064820466831'
pr_number: null
parent: story-411-420-extract-player-team
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Active Team Extraction

## Objective
Review the implementation of the Gen 3 active team extraction to ensure it meets requirements and constraints.

## Verification Steps
- Verify extraction of Pokémon species, moves, and stats.
- Ensure strict adherence to the "Save File Parsing & Extraction Guidelines" in `.foundry/docs/schema.md` (Section 13). Check for module-level constants, no magic numbers, relative offsets, and proper `RangeError` handling.
- Verify tests cover the extraction logic and do not use @testing-library.

## Acceptance Criteria
- [ ] Review implementation and tests.
