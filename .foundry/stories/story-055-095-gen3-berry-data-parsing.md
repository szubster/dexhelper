---
id: story-055-095-gen3-berry-data-parsing
type: STORY
title: Gen 3 Berry Tracker DataView Parsing Logic
status: READY
owner_persona: tech_lead
created_at: '2026-06-08'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-055-gen3-berry-tracker-data-extraction
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Berry Tracker DataView Parsing Logic

## Overview
Implement the extraction logic for Gen 3 berry patches using the native `DataView` API.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for Gen 3 berry patches.
- [ ] Implement graceful handling of bounds checking by throwing/catching `RangeError`.
- [ ] Extract map ID, berry ID, current growth stage, time planted, and last watered time.

- [ ] .foundry/tasks/task-095-157-gen3-berry-dataview-parsing.md // Tech Lead: Verified failure of initial implementation.
- [ ] .foundry/tasks/task-095-158-gen3-berry-dataview-parsing-qa.md // Tech Lead: Reverted incorrect frontmatter modification.
- [ ] .foundry/research/research-095-175-gen3-berry-implicit-data.md
- [ ] .foundry/tasks/task-095-183-gen3-berry-dataview-parsing-retry.md
- [ ] .foundry/tasks/task-095-184-gen3-berry-dataview-parsing-retry-qa.md
