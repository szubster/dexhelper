---
id: task-273-327-living-dex-pc-mapping-impl
type: TASK
title: Living Dex PC Mapping Implementation
status: FAILED
owner_persona: coder
created_at: '2026-07-16'
updated_at: '2026-08-03'
depends_on:
  - research-327-385-gen3-pc-box-offsets
jules_session_id: null
pr_number: null
parent: story-133-273-living-dex-pc-mapping
tags:
  - living-dex
  - data-mapping
research_references: []
rejection_count: 2
rejection_reason: Suspended pending research
notes: ''
---

# Task: Living Dex PC Mapping Implementation

## Context
This task implements the mapping layer to identify which Pokémon the player currently owns and their exact PC Box and Slot locations. This data mapping allows the Living Dex Tracker to properly render and track owned Pokémon in their current positions.

## Acceptance Criteria
- [ ] Implement data mapping functions to extract PC Box and Slot locations for owned Pokémon.
- [ ] Parse PC Box data correctly according to Gen 3 architecture specifications.

## Technical Blueprint

1. **Mapping Functions**:
   - Write the data mapping layer that queries or parses the user's PC Box state to extract the ownership status and location (Box, Slot) of Pokémon.
   - Utilize existing `PokeData` application data structure (with fully expanded property names as per ADR 015) when building the payload.

2. **Gen 3 Save Parsing Constraints**:
   - When extracting data from Gen 3 save files, you **MUST** use the dynamically resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
   - **NO INLINE MAGIC NUMBERS**: All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level.

3. **Architectural Scaffolding**:
   - If this implementation requires complex shared state (like UI toggles or global states), you must define the React Context layer first before implementing dependent UI components to prevent tight coupling.
   - Follow the tactical hardware aesthetic rules (ADR 008): `rounded-none`, `border-dashed`, and `font-mono`.

## Important Reminders for the Coder

- **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Submission**: If you submit an empty PR for a completed task (e.g., if the code already exists), you MUST check off all Acceptance Criteria checkboxes before submitting.
