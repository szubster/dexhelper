---
id: task-104-159-gen3-roamer-interface-impl
type: TASK
title: Update SaveData.roamingLegendaries interface for Gen 3
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '15972724275597505462'
pr_number: null
parent: story-067-104-gen3-roamer-data-structure
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update SaveData.roamingLegendaries interface for Gen 3

## Objective
Standardize the `roamingLegendaries` interface in `src/engine/saveParser/parsers/common.ts` to cleanly support Gen 3 roamer data while maintaining backward compatibility with Gen 2.

## Context
Gen 2 provides `speciesId`, `level`, `mapGroup`, and `mapId` for its roamers (Raikou, Entei, Suicune). Gen 3 (Latios/Latias) will also need this property populated, utilizing its own `mapGroup` and `mapId` definitions based on the unified Map ID format `(GroupIndex << 8) | MapIndex`.
We need to ensure the `roamingLegendaries` type signature in the `SaveData` interface is robust for both generations and well-documented.

## Requirements
- Update the `roamingLegendaries` property documentation in the `SaveData` interface (`src/engine/saveParser/parsers/common.ts`) to indicate it applies to both Gen 2 and Gen 3.
- Document within the interface comments the differences in how `mapGroup` and `mapId` are structured or interpreted between Gen 2 and Gen 3.
  - Gen 2: Separate bytes for `mapGroup` and `mapId`.
  - Gen 3: Utilizes the unified Map Group / Map Index architecture.

## Acceptance Criteria
- [ ] `roamingLegendaries` documentation in `SaveData` explicitly states support for Gen 2 and Gen 3 roamers.
- [ ] Interface comments explain the map group/id differences between the generations.
- [ ] If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
