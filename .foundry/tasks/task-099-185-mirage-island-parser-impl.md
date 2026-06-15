---
id: task-099-185-mirage-island-parser-impl
type: TASK
title: Implement Gen 3 Mirage Island Parser
status: READY
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-099-implement-mirage-island-parser
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Mirage Island Parser

## Context
With the data offsets located, we need to implement the actual parser for the Gen 3 Mirage Island value.
The Mirage Island value is stored as a random value within the "Section 2 - Game State" of the save file structure. It is a 16-bit integer (2 bytes) in Little-endian.

## Requirements
1.  **Parse Mirage Island Value**: Update the Gen 3 save parser engine (`src/engine/saveParser/parsers/gen3.ts`) to extract the 16-bit Mirage Island value using the following offsets depending on the game version:
    - **Ruby / Sapphire**: Section 2, Offset `0x0408`.
    - **Emerald**: Section 2, Offset `0x0464`.
2.  **Use DataView API**: You MUST strictly use the native `DataView` API (e.g., `getUint16`) for safe data parsing as mandated by ADR 010.
3.  **Graceful Error Handling**: Do not crash on out-of-bounds reads. Rely on `DataView` throwing `RangeError` and handle it gracefully by propagating specific validation errors.
4.  **Unit Tests**: Add unit tests in `src/engine/saveParser/parsers/gen3.test.ts` to verify correct parsing.

## Acceptance Criteria
- [ ] Implement Gen 3 Mirage Island value parsing logic using `DataView`.
- [ ] Ensure `RangeError` is caught and handled gracefully as per ADR 010.
- [ ] Add unit tests covering Ruby/Sapphire and Emerald offset logic.

## Coder Persona Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the YAML frontmatter.
