---
id: task-127-441-gen3-match-call-schema-integration-qa
type: TASK
title: QA for Gen 3 Match Call Schema Integration
status: ACTIVE
owner_persona: qa
created_at: '2026-08-19'
updated_at: '2026-08-22'
depends_on:
  - task-127-440-gen3-match-call-schema-integration-impl
jules_session_id: '9693930305800850787'
pr_number: null
parent: story-083-127-gen3-match-call-schema-integration
tags:
  - feature
  - gen3
  - tracking
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA for Gen 3 Match Call Schema Integration

## Overview
Verify the extracted Match Call data correctly conforms to the `SaveData` schema and is properly integrated.

## Acceptance Criteria
- [ ] Verify that the `Gen3MatchCall` is correctly added to `Gen3SaveData`.
- [ ] Confirm no regressions are introduced (e.g. by running `pnpm test`).
- [ ] Verify that `Gen3MatchCall` interface is exported correctly from `src/engine/gen3/matchCall/parser.ts`.
