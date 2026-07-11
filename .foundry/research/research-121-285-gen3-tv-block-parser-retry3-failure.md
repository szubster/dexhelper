---
id: research-121-285-gen3-tv-block-parser-retry3-failure
type: RESEARCH
title: Investigate Gen 3 TV Block Parser Retry 4 Failure
status: READY
owner_persona: researcher
created_at: '2026-07-08'
updated_at: '2026-07-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - research
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 TV Block Parser Retry 4 Failure

## Objective
Investigate the root cause of the `task-121-278-gen3-tv-block-parser-retry3-impl` failure (which reached its max rejection count). Determine why the coder failed to adhere to the strict constraint regarding module-level reusable constants, and define explicit instructions and memory offsets/constants that MUST be used in the next iteration to prevent a recurring QA rejection.

## Instructions
1. Analyze the failure feedback from QA or the Auditor for `task-121-278` and determine the exact root cause.
2. Identify the correct module-level constant names and values that should replace these magic numbers based on the `gen3_tv_shows_and_events.md` or related knowledge base documents.
3. Document these explicit constants so the next implementer blueprint can mandate their exact usage.

## Findings
The failure was due to hardcoded magic numbers for the TV block memory offsets. The following module-level constants must be used:
- `TVGROUP_RECORD_MIX_START = 21`
- `TVGROUP_RECORD_MIX_END = 40`
- `TVSHOW_STRUCT_SIZE = 36`
- `TV_SHOWS_COUNT = 25`
- `TVSHOW_MASS_OUTBREAK = 41`
- `OUTBREAK_MOVES_OFFSET = 0x04`
- `OUTBREAK_SPECIES_OFFSET = 0x0C`
- `OUTBREAK_MAP_NUM_OFFSET = 0x10`
- `OUTBREAK_MAP_GROUP_OFFSET = 0x11`
- `OUTBREAK_PROBABILITY_OFFSET = 0x13`
- `OUTBREAK_LEVEL_OFFSET = 0x14`
- `OUTBREAK_DAYS_BEFORE_OFFSET = 0x16`
- `OUTBREAK_LANGUAGE_OFFSET = 0x18`
