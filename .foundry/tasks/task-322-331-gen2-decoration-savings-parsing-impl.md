---
id: task-322-331-gen2-decoration-savings-parsing-impl
type: TASK
title: Implement Gen 2 Room Decoration & Bank Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-07-17'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: '3301985786019230943'
pr_number: null
parent: story-311-322-gen2-room-decoration-parsing
tags:
  - gen2
  - engine
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 2 Room Decoration & Bank Parsing

## Objective
Implement the parser extraction for Gen 2 room decorations (bed, carpet, plant, poster, console, plushies) and Mom's bank account savings.

## Requirements
- Define the correct memory offsets and data structures to read the flags for unlocked room decorations.
- Define the memory offsets to parse the money currently saved in Mom's bank account.
- Expose the extracted data seamlessly through the DexHelper Gen 2 core API.

## Architectural Constraints
- **Module-Level Constants**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden (ADR 028).
- **Late-Binding Notice**: If the exact memory offsets are unknown, you MUST spawn a RESEARCH node to investigate, add it to this task's `depends_on` array, update the `status` to `FAILED` with a clear `rejection_reason`, and submit an Empty PR to suspend this task. Do not guess the offsets.
- If you cannot complete this task (e.g. due to missing offsets you choose not to research, or permanent failure), you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [x] Implement parsing for Gen 2 room decorations.
- [x] Implement parsing for Mom's bank savings.
- [x] Expose data via the DexHelper Gen 2 core API.
- [x] Use module-level constants for all memory offsets and avoid inline magic numbers.
- [x] Write unit tests verifying the parsing logic.

## Research Dependency
- [x] .foundry/research/research-331-335-gen2-decoration-savings-offsets.md
