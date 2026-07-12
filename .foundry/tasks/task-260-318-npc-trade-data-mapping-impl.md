---
id: task-260-318-npc-trade-data-mapping-impl
type: TASK
title: NPC Trade Data Mapping Implementation
status: PENDING
owner_persona: coder
created_at: '2026-07-13'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-260-npc-trade-data-mapping
tags:
  - backend
  - mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: NPC Trade Data Mapping Implementation

## Objective
Implement a standard mapping connecting raw bitflags to specific NPC trade encounters (e.g., MUSCLE the Machop) for Gen 2 and Gen 3.

## Context and Constraints
- The `coder` MUST map the raw bitflags successfully extracted in previous tasks to specific, human-readable NPC trade encounters.
- If a transient failure requiring retry is experienced, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task must be permanently aborted, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If an empty PR is submitted for a completed task, all Acceptance Criteria checkboxes MUST be checked off before submitting.
- **CRITICAL:** When implementing parsing or data definitions, explicitly define and use reusable constants for memory offsets, lengths, bit locations, and shifts at the module level. Inline magic numbers are strictly forbidden.
- **CRITICAL:** For Gen 3 data, use relative memory offsets rather than absolute hardcoded ones if applicable, ensuring compatibility across different flash memory bank structures.

## Acceptance Criteria
- [ ] Implement mapping for Gen 2 NPC trade flags to specific encounters.
- [ ] Implement mapping for Gen 3 NPC trade flags (RSE/FRLG) to specific encounters.
- [ ] Ensure the mapping correctly identifies the encounter species and nickname (e.g., MUSCLE the Machop).
- [ ] Module-level reusable constants are explicitly defined for any required offsets or locations. No inline magic numbers are used.
