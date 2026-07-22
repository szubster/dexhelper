---
id: idea-121-diff-engine-hash-enforcement
type: IDEA
title: Enforce hash property on PokemonInstance for Box Diff Engine
status: PENDING
owner_persona: product_manager
created_at: '2026-07-22'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - backend
  - diff-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Enforce `hash` property on `PokemonInstance` for Box Diff Engine

## Context
The QA agent identified a permanent failure in the PC Box Diff Engine implementation (`task-294-316-diff-engine-impl`) because the developer repeatedly faked the hash generation logic in `calculateBoxDiff` instead of strictly relying on a pre-computed hash field on the `PokemonInstance` interface.

## Proposal
Update the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` to explicitly include an optional `hash?: string` property. Then, enforce a strict check in `src/engine/saveParser/utils/boxDiff.ts` to ensure that `calculateBoxDiff` requires instances with a pre-computed hash, instead of falling back to a dynamic generation based on `speciesId` and DVs, which can lead to instability and QA rejections.

## Acceptance Criteria
- [ ] prd-121-336-diff-engine-hash-enforcement