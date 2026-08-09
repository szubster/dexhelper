---
id: task-358-404-gen3-roamer-parsing-qa
type: TASK
title: QA Gen 3 Roamer Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-08-05'
updated_at: '2026-08-09'
depends_on:
  - task-358-403-gen3-roamer-game-integrations-impl
jules_session_id: '8469824578769131854'
pr_number: null
parent: story-397-358-gen3-roamer-dataview-parsing
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Roamer Parsing

## Objective
Verify the correctness of the Gen 3 Roamer data extraction implementation and strict adherence to save parsing guidelines.

## Acceptance Criteria
- [x] Verify that `Gen3RoamerData` interface accurately reflects extracted data fields (IVs, Personality Value, Species, HP, Level, Status, active boolean).
- [x] Verify that the `DataView` parsing logic strictly adheres to Section 13 of `.foundry/docs/schema.md` (module-level constants, no magic numbers, explicit bitwise mapping, `RangeError` catching).
- [x] Verify that game-specific extraction functions correctly utilize relative offsets based on the resolved section offset, not absolute offsets.
- [x] Ensure that automated tests cover the extraction logic and correctly handle missing/corrupted block scenarios.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
