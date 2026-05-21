---
id: epic-032-042-generation-pipeline-keys
type: EPIC
title: Update Data Generation Pipeline to Verbose Keys
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
parent: prd-005-032-revert-data-optimizations
rejection_reason: ''
notes: ''
---

# Epic: Update Data Generation Pipeline to Verbose Keys

## Objective
Refactor the data generation pipeline (`scripts/generate-pokedata.ts`) to output verbose keys instead of shortened properties to improve DX, aligning with the MsgPack `useRecords` optimization format.

## Scope
- Update all exported object mappings in `scripts/generate-pokedata.ts` to output full property names (`name`, `captureRate`, `genderRate`, `chance`, etc.) instead of the previously optimized short keys (`n`, `cr`, `gr`, `c`, etc.).
- Ensure that enum-to-number mapping logic remains unchanged, to retain existing deduplication benefits.

## Prerequisites
- Completion of the ADR 015 documenting the global data contract changes.

## Acceptance Criteria
- [x] The generated output from `scripts/generate-pokedata.ts` uses verbose keys like `name` and `captureRate`.
- [x] Enum-to-number optimizations are preserved.

## Child Nodes
- .foundry/stories/story-042-080-refactor-generation-exports.md
- .foundry/stories/story-042-081-preserve-enum-optimizations.md
