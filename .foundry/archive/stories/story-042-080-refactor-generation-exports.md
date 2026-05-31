---
id: story-042-080-refactor-generation-exports
type: STORY
title: Refactor Data Generation Pipeline to Verbose Keys
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
parent: epic-032-042-generation-pipeline-keys
rejection_reason: ''
notes: ''
rejection_count: 1
---

# Story: Refactor Data Generation Pipeline to Verbose Keys

## Objective
Refactor the data generation pipeline (`scripts/generate-pokedata.ts`) to output verbose keys instead of shortened properties to improve DX, aligning with the MsgPack `useRecords` optimization format.

## Acceptance Criteria
- [x] The generated output from `scripts/generate-pokedata.ts` uses verbose keys like `name` and `captureRate`.

- task-080-132-refactor-generation-exports-impl
- task-080-133-refactor-generation-exports-qa
