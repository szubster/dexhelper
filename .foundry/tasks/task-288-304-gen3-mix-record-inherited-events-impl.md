---
id: task-288-304-gen3-mix-record-inherited-events-impl
type: TASK
title: Extract Gen 3 Mix Record Inherited Events Implementation
status: FAILED
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-288-gen3-mix-record-inherited-events
tags:
  - feature
  - gen3
  - data-parsing
  - implementation
research_references:
  - .foundry/docs/knowledge_base/gen3_tv_shows_and_events.md
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria'
notes: ''
---

# Blueprint: Gen 3 Mix Record Inherited Events Extraction Implementation

## Objective
Implement extraction logic to parse inherited events data (TV Shows) originating from other players' save files via the "Mix Record" feature in Gen 3 games (Ruby, Sapphire, Emerald).

## Context
As detailed in `.foundry/docs/knowledge_base/gen3_tv_shows_and_events.md`, Gen 3 games store TV Show broadcast data in an array within `SaveBlock1` at offset `0x27CC`.

The TV show array contains 25 records. Each record is 36 bytes in size and follows a structure with a common header:
- Byte `0x00`: `kind` (ID of the broadcast)
- Byte `0x01`: `active` (boolean flag)

Mix Record shows are those where the `kind` ID is between `21` and `40` (inclusive). Some notable types:
- `21`: `TVSHOW_POKEMON_TODAY_CAUGHT`
- `22`: `TVSHOW_SMART_SHOPPER`
- `23`: `TVSHOW_POKEMON_TODAY_FAILED`
- `24`: `TVSHOW_FISHING_ADVICE`
- `25`: `TVSHOW_WORLD_OF_MASTERS`
- `31`: `TVSHOW_SECRET_BASE_VISIT`
- `33`: `TVSHOW_BATTLE_SEMINAR`

## Requirements

1. **Memory Map Constants:**
   - Explicitly define the memory offset for the `TVShow` array (`0x27CC`), the array length (`25`), the struct size (`36`), and any bit locations or shifts as reusable module-level constants. **Do not use inline magic numbers** for array bounds checking, offsets, loop iterations, or bit shifts.

2. **Extraction Logic:**
   - Iterate over the `TVShow` array.
   - For each active show (`active` byte is truthy), inspect the `kind` byte.
   - If the `kind` byte is within the `TVGROUP_RECORD_MIX` range (`21` to `40`), extract its data and identify it as an inherited event.
   - Extract the payload data correctly based on the TV show kind (you may need to explore the exact payload fields for each relevant kind if needed, or extract a raw buffer/string if not strictly structured yet). Focus primarily on providing an array or object containing these active inherited events with their kind and raw buffer payload, so they can be parsed further or displayed.
   - Integrate this extraction into the Gen 3 save file parsing pipeline.

3. **Handling Failures:**
   - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
   - If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
   - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Module-level constants are defined for `TVShow` offsets, lengths, and kind ID bounds.
- [ ] Logic correctly parses the `TVShow` array from `SaveBlock1` at offset `0x27CC`.
- [ ] Active Mix Record shows (kinds 21-40) are successfully isolated and extracted.
- [ ] No inline magic numbers are used in the parsing implementation.
