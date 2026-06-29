---
id: task-122-234-parse-battle-frontier-symbols-impl
type: TASK
title: Gen 3 Parse Battle Frontier Symbols Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-06-12'
updated_at: '2026-06-28'
depends_on:
  - story-078-121-gen3-parse-battle-frontier-win-streaks
jules_session_id: '16380654223830525386'
pr_number: null
parent: story-078-122-gen3-parse-battle-frontier-symbols
tags:
  - feature
  - gen3
  - endgame
  - save-engine
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Battle Frontier Symbols Implementation

## Context
Implement the logic to extract Silver and Gold symbol flags for the 7 Battle Frontier facilities from the Gen 3 save file (`SaveBlock1`), based on research findings in `research-046-140-gen3-battle-frontier`.

This task follows ADR 010 (Mandate `DataView` API) and ADR 026 (Bitwise State Extraction).

## Requirements

1. **Extract Flags**: Extract the Silver and Gold flags from the `SaveBlock1` section using the `DataView` API.
   - Ensure the parser uses `DataView` to get the appropriate byte and then explicitly applies bitwise masking (`&`) and shifting (`>>`) to read the individual bits.
   - Flags array offset is `0x1270` within Section 1 (SaveBlock1 start).
   - Use the following specific offsets and bit shifts (relative to `SaveBlock1` start):
      - **Tower Silver:** Offset `0x1388`, Bit 4
      - **Tower Gold:** Offset `0x1388`, Bit 5
      - **Dome Silver:** Offset `0x1388`, Bit 6
      - **Dome Gold:** Offset `0x1388`, Bit 7
      - **Palace Silver:** Offset `0x1389`, Bit 0
      - **Palace Gold:** Offset `0x1389`, Bit 1
      - **Arena Silver:** Offset `0x1389`, Bit 2
      - **Arena Gold:** Offset `0x1389`, Bit 3
      - **Factory Silver:** Offset `0x1389`, Bit 4
      - **Factory Gold:** Offset `0x1389`, Bit 5
      - **Pike Silver:** Offset `0x1389`, Bit 6
      - **Pike Gold:** Offset `0x1389`, Bit 7
      - **Pyramid Silver:** Offset `0x138A`, Bit 0
      - **Pyramid Gold:** Offset `0x138A`, Bit 1
2. **Constants**: All memory offsets and bit shifts MUST be defined as reusable module-level constants (e.g. `const TOWER_SILVER_OFFSET = 0x1388; const TOWER_SILVER_BIT = 4;`). Do not use inline magic numbers.
3. **Graceful Failures**: Wrap the read operations in a `try/catch` block. Catch `RangeError` from the `DataView` API to detect out-of-bounds reads and propagate it as a controlled validation error ("Corrupted Save File").
4. **Testing**: Write unit tests to verify the bitwise extraction logic, boundary tests for the `DataView`, and ensure absolute zero state parsing handles properly (as per ADR 026).

## Acceptance Criteria
- [x] Implement symbol flags parsing using `DataView` with exact offsets and bit masks.
- [x] Define module-level constants for all offsets and bits.
- [x] Catch `RangeError` from `DataView` and handle it gracefully.
- [x] Write unit tests to cover the implementation.

## Reminders
- If you encounter a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g. if the logic already exists), you MUST check off all Acceptance Criteria checkboxes before submitting.
