---
id: task-104-159-gen3-roamer-interface-qa
type: TASK
title: QA - Verify Gen 3 Roamer Interface Update
status: READY
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-14'
depends_on:
  - task-104-159-gen3-roamer-interface-impl
jules_session_id: null
pr_number: null
parent: story-067-104-gen3-roamer-data-structure
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Verify Gen 3 Roamer Interface Update

## Objective
Verify that the `SaveData.roamingLegendaries` interface documentation in `src/engine/saveParser/parsers/common.ts` correctly handles Gen 3 differences.

## Context
A coder task (`task-104-159-gen3-roamer-interface-impl`) has been implemented to update the `SaveData.roamingLegendaries` documentation for Gen 2 vs Gen 3 differences in map group/id structure. This QA task ensures those changes are correct and robust.

## Requirements
- Verify that `src/engine/saveParser/parsers/common.ts` has been correctly updated.
- Ensure the interface comments explicitly describe Gen 2 map properties and Gen 3 map properties (unified map group/index).

## Acceptance Criteria
- [x] Verified `SaveData.roamingLegendaries` documentation supports both Gen 2 and Gen 3.
- [x] Verified interface comments explain map group/id differences between generations.
- [x] If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- [x] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
