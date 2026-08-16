---
id: task-099-157-gen3-extract-pokemon-pids-impl
type: TASK
title: Implement Gen 3 Pokemon PID Extraction
status: READY
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-08-16'
depends_on:
  - research-157-369-gen3-party-box-offsets
jules_session_id: null
pr_number: null
parent: story-061-099-extract-pokemon-pids
tags:
  - gen3
  - data-parsing
  - mirage-island
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Pokemon PID Extraction

## Context
As part of the Mirage Island Engine updates, we need to extract the 32-bit Personality Values (PIDs) from all Pokémon in the player's active party and PC storage boxes for Gen 3 saves.

## Requirements
1.  **Parse Party PIDs**: Implement logic to iterate through the active party in a Gen 3 save and extract the 32-bit PID for each Pokémon.
2.  **Parse PC PIDs**: Implement logic to iterate through all PC boxes in a Gen 3 save and extract the 32-bit PID for each stored Pokémon.
3.  **Use DataView API**: You MUST strictly use the native `DataView` API (e.g., `getUint32`) for safe data parsing as mandated by ADR 010.
4.  **Graceful Error Handling**: Do not crash on out-of-bounds reads. Rely on `DataView` throwing `RangeError` and handle it gracefully by propagating specific validation errors (e.g., "Corrupted Save File").

## Acceptance Criteria
- [ ] Implement Gen 3 party parsing logic using `DataView` to extract PIDs.
- [ ] Implement Gen 3 PC box parsing logic using `DataView` to extract PIDs.
- [ ] Ensure `RangeError` is caught and handled gracefully as per ADR 010.

## Coder Persona Reminders
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- If you submit an empty PR for a completed task (e.g., if the work is already done), you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the frontmatter in this case.

- [ ] research-157-369-gen3-party-box-offsets
