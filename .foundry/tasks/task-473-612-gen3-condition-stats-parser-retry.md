---
id: task-473-612-gen3-condition-stats-parser-retry
type: TASK
title: Implement Gen 3 Contest Condition Stats Parser (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-09-22'
updated_at: '2026-09-22'
depends_on:
  - research-473-611-investigate-condition-stats-parser-failure
jules_session_id: null
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

# Implement Gen 3 Contest Condition Stats Parser (Retry)

## Objective
Implement the logic to extract the Contest Condition stats using the `DataView` API.

## Technical Context
- Incorporate the findings from the prerequisite research task.
- Use the DataView API and catch RangeError as per Section 13.
- Read the 32-bit Personality Value at offset 0x00 and locate the EVs & Condition (E) substructure at offset 0x20.

## Acceptance Criteria
- [ ] Implement parsing function using DataView API to extract Condition stats.
- [ ] Integrate the permutation logic to correctly locate the 'E' substructure.
- [ ] Catch RangeError from DataView and throw the required error message.
- [ ] Ensure all offset and size values use the module-level constants.