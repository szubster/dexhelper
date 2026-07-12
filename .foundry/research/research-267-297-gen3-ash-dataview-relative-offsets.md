---
id: research-267-297-gen3-ash-dataview-relative-offsets
type: RESEARCH
title: Gen 3 Volcanic Ash Relative Offsets
status: PENDING
owner_persona: researcher
depends_on: []
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Volcanic Ash Relative Offsets

## Context
The previous implementation task for extracting Volcanic Ash count (`task-267-261-gen3-ash-dataview-extraction-impl`) failed permanently because it used hardcoded absolute offsets (`0x142C` / `0x13D0`). Gen 3 saves use an A/B bank rotation system for flash memory. Using absolute offsets will fail when the active bank rotates. We must determine the correct relative offset calculation.

## Acceptance Criteria
- [ ] Investigate the root cause of the previous implementation failure regarding absolute offsets vs relative offsets.
- [ ] Document how to calculate the correct relative memory offset for Volcanic Ash using the dynamically resolved `section1Offset` provided by the parsing engine.
- [ ] Define what the module-level constant values should be for these relative offsets, adhering to ADR 028.

## Developer Instructions
- **Failure conditions:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Completion conditions:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.