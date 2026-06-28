---
id: story-062-099-gen3-expose-lower-16bit-pv
type: STORY
title: Expose lower 16-bits of PV
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-28'
depends_on:
  - story-062-098-gen3-parse-32bit-pv
jules_session_id: null
pr_number: null
parent: epic-038-062-personality-value-extraction
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Expose lower 16-bits of PV

## Context
As part of the Mirage Island checking feature (Epic `epic-038-062-personality-value-extraction`), after parsing the 32-bit PV, we need to pre-calculate and expose its lower 16 bits. This specific 16-bit value is compared against the daily generated Mirage Island value to determine if the island will appear.

## Requirements
1. **Pre-calculation**: Ensure that the lower 16 bits of the 32-bit PV are calculated and exposed during the data parsing and processing phases.
2. **Data Structure Consistency**: Add this logic securely and optimally alongside the newly minted 32-bit PV value.

## Acceptance Criteria
- [x] Tech Lead: Generate child tasks to update formatting and exposure logic.

- [ ] .foundry/tasks/task-099-228-expose-lower-16bit-pv-impl.md
- [ ] .foundry/tasks/task-099-229-expose-lower-16bit-pv-qa.md
