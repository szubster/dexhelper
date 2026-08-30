---
id: epic-339-408-orchestrator-themed-output
type: EPIC
title: Orchestrator Themed Output Updates
status: ACTIVE
owner_persona: story_owner
created_at: '2024-05-18'
updated_at: '2026-08-29'
depends_on:
  - epic-339-405-schema-role-mapping
jules_session_id: '6868417879164900300'
pr_number: null
parent: prd-122-339-pokemon-themed-foundry-personas
tags:
  - foundry
  - orchestrator
  - gamification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Orchestrator Themed Output Updates

## Objective
Update the Foundry Orchestrator script to output themed messages and emoji badges to GitHub Action summaries.

## Functional Requirements
- Modify `.github/scripts/foundry-orchestrator.ts` to output themed console messages.
- Inject Pokemon Gen 1 themed emoji badges into GitHub Action summaries based on status and persona.

## Acceptance Criteria
- [x] Story Owner: Generate STORY node(s) for modifying the orchestrator script to include themed outputs.
- [x] Story Owner: Generate a final STORY node dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-408-490-orchestrator-themed-output-impl
- [ ] story-408-491-orchestrator-themed-output-e2e
