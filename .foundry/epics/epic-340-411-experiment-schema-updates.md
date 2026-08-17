---
id: epic-340-411-experiment-schema-updates
type: EPIC
title: Experiment Schema and Metadata Updates
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-135-340-automated-agent-ab-testing-framework
tags:
  - schema
  - foundry
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Experiment Schema and Metadata Updates

## Objective
Update the Foundry YAML schema and underlying types to support defining A/B experiment variants within tasks or as a new node type.

## Scope
1. Define the exact YAML structure for variants (e.g., `experiment_variants` array or `EXPERIMENT` node type) in `.foundry/docs/schema.md`.
2. Update TypeScript interfaces and parsers in the orchestrator scripts to successfully parse and validate the new fields.

## Acceptance Criteria
- [x] Story Owner: Break down into Stories. Ensure that a final STORY dedicated exclusively to Integration and E2E Verification is generated and appropriately tagged with `e2e` or `integration`.
- [x] story-411-412-define-experiment-schema
- [x] story-411-413-update-orchestrator-types
- [x] story-411-414-experiment-schema-e2e
