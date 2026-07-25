---
id: task-260-319-npc-trade-data-mapping-qa
type: TASK
title: NPC Trade Data Mapping QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-13'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-260-npc-trade-data-mapping
tags:
  - backend
  - mapping
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: NPC Trade Data Mapping QA

## Objective
Verify the standard mapping connecting raw bitflags to specific NPC trade encounters for Gen 2 and Gen 3.

## Context and Constraints
- The `qa` persona MUST verify that the `coder` correctly implemented the mappings.
- If a transient failure requiring retry is experienced, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If the task must be permanently aborted, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If an empty PR is submitted for a completed task, all Acceptance Criteria checkboxes MUST be checked off before submitting.
- **CRITICAL:** Ensure that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers are strictly forbidden. If any are found, reject the implementation task.

## Acceptance Criteria
- [x] Verify that Gen 2 NPC trade flag mapping is correctly implemented.
- [x] Verify that Gen 3 NPC trade flag mapping (RSE/FRLG) is correctly implemented.
- [x] Verify that there are no inline magic numbers used for offsets or data lengths.
- [x] Verify that the `SaveData` correctly maps the extracted flags to the encounters.
