---
id: task-473-639-gen3-condition-stats-parser-v3
type: TASK
title: Implement Gen 3 Contest Condition Stats Parser (Retry 2)
status: ACTIVE
owner_persona: coder
created_at: '2026-09-30'
updated_at: '2026-10-04'
depends_on:
  - research-473-638-investigate-condition-stats-parser-failure-v2
jules_session_id: '84572156569908071'
pr_number: null
parent: story-134-473-gen3-condition-stats-extraction-impl
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Contest Condition Stats Parser (Retry 2)

## Objective
Implement the logic to extract the Contest Condition stats using the \`DataView\` API.

## Technical Context
- Incorporate the findings from the prerequisite research task.
- Use the DataView API and catch RangeError as per Section 13.
- Read the 32-bit Personality Value at offset 0x00 and locate the EVs & Condition (E) substructure at offset 0x20.

## Acceptance Criteria
- [x] Implement parsing function using DataView API to extract Condition stats.
- [x] Integrate the permutation logic to correctly locate the 'E' substructure.
- [x] Catch RangeError from DataView and throw the required error message.
- [x] Ensure all offset and size values use the module-level constants.
