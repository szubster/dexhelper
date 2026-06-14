---
id: task-095-184-gen3-berry-dataview-parsing-retry-qa
type: TASK
title: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic Retry
status: PENDING
owner_persona: qa
created_at: 2026-06-14
updated_at: 2026-06-14
depends_on:
  - task-095-183-gen3-berry-dataview-parsing-retry-impl
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
  - qa
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: QA Verification for Gen 3 Berry Tracker DataView Parsing Logic Retry

## Overview
Verify the implementation of the extraction logic for Gen 3 berry patches, ensuring that missing/implicit data is not erroneously extracted.

## Constraints & Verification Steps
- Verify that the implementation uses the `DataView` API exclusively, avoiding raw `Uint8Array` manipulations.
- Verify that bounds checking is gracefully handled by catching `RangeError` exceptions and raising proper errors (e.g., "Corrupted Save File").
- Verify that `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and `watered` stages are extracted correctly according to the documented structures in `.foundry/docs/knowledge_base/gen3_berry_patch_offsets.md`.
- Ensure that `map ID`, `time planted`, and `last watered time` are properly omitted from the extraction as per research findings.
- Ensure that the tests correctly mock range bounds and corrupted save files without crashing the process.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `DataView` reading logic for Gen 3 berry patches implementation is correct.
- [ ] Verify graceful handling of bounds checking (throwing/catching `RangeError`) without process crash.
- [ ] Verify correct extraction of `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and watering history bitflags.
- [ ] Verify that `map ID`, `time planted`, and `last watered time` are omitted.
