---
id: task-246-437-gen3-box-parsing-qa
type: TASK
title: QA Gen 3 Box Parsing and Grouping
status: ACTIVE
owner_persona: qa
created_at: '2026-08-17'
updated_at: '2026-08-22'
depends_on:
  - task-246-436-gen3-box-parsing-aggregation
jules_session_id: '4685132840042899024'
pr_number: null
parent: story-108-246-gen3-box-parsing
tags:
  - qa
  - backend
  - save-parsing
  - gen3
research_references:
  - research-246-244-gen3-box-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Box Parsing and Grouping

## Objective
Verify the Gen 3 PC Box parsing and aggregation implementations.

## Context
This task verifies the work done in the binary extraction and stats aggregation tasks.

## Acceptance Criteria
- [ ] Verify that Gen 3 PC box binary data is extracted securely using the `DataView` API.
- [ ] Confirm no inline magic numbers were used for offsets/shifts (ADR 028 compliance).
- [ ] Validate the accuracy of IVs, Natures, Hidden Power, and Shininess calculations.
- [ ] Verify that the final data is correctly grouped by species ID and excludes Party Pokémon.
- [ ] Ensure robust unit test coverage.
