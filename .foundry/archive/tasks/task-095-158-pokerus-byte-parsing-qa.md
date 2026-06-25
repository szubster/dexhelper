---
id: task-095-158-pokerus-byte-parsing-qa
type: TASK
title: QA Pokerus Byte Parsing
status: COMPLETED
owner_persona: qa
created_at: '2026-06-08'
updated_at: '2026-06-12'
depends_on:
  - task-095-157-pokerus-byte-parsing-impl
jules_session_id: null
pr_number: null
parent: story-061-095-pokerus-byte-parsing
tags:
  - gen2
  - save-engine
  - pokerus
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Pokerus Byte Parsing

## Description
Verify the implementation of Pokerus byte parsing.

## Acceptance Criteria
- [x] Verify `PokemonInstance.pokerus` type in `src/engine/saveParser/parsers/common.ts` is updated.
- [x] Verify `parseGen2PokemonInstance` correctly parses the raw byte into `strain` and `daysRemaining`.

### Critical Contract Reminders
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
