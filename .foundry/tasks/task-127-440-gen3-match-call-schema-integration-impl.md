---
id: task-127-440-gen3-match-call-schema-integration-impl
type: TASK
title: Implement Gen 3 Match Call Schema Integration
status: ACTIVE
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '6624924045622993999'
pr_number: null
parent: story-083-127-gen3-match-call-schema-integration
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Match Call Schema Integration

## Overview
Expose the extracted Match Call data correctly to the `SaveData` schema to be consumed by the UI. The parser returns a structure defined as `Gen3MatchCall`.

## Context
The DataView parser for Match Call (`Gen3MatchCall`) was already implemented in `src/engine/gen3/matchCall/parser.ts` and integrated into the save parsing logic inside `src/engine/saveParser/parsers/gen3.ts`. The schema interface is currently in `src/engine/saveParser/parsers/common.ts`.

## Constraints
- Do not modify the YAML frontmatter.
- Make sure to update tests in `src/engine/assistant/strategies/utils/matchCall.test.ts` if needed, although it seems to already use the mock data matching the current schema definition.

## Acceptance Criteria
- [x] Integrate Match Call state into the SaveData schema. (This is arguably already done since `gen3MatchCall` is in `Gen3SaveData`, but make sure everything is properly exposed/exported if anything is missing).
- [x] Ensure that `Gen3MatchCall` interface is exported correctly from `src/engine/gen3/matchCall/parser.ts`.
- [x] Write any necessary integration tests if not already covered.
