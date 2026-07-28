---
id: task-260-353-egg-move-multi-step-chains-qa
type: TASK
title: QA Verification - Multi-Step Breeding Chains Support
status: ACTIVE
owner_persona: qa
created_at: '2026-07-27'
updated_at: '2026-07-28'
depends_on:
  - task-260-352-egg-move-multi-step-chains-impl
jules_session_id: '7181633806701509626'
pr_number: null
parent: story-113-260-egg-move-multi-step-chains
tags:
  - qa
  - mechanics
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Verification - Multi-Step Breeding Chains Support

## Overview
Verify the implementation of multi-step breeding chains support.

## Contracts
- Write test cases in `src/engine/assistant/__tests__/generateSuggestions.test.ts` to ensure multi-step chains correctly generate suggestions when only an early ancestor is owned.

## Acceptance Criteria
- [ ] Tests verify a 3+ step breeding chain correctly identifies an owned ancestor multiple steps back.
- [ ] Tests verify priority logic works as expected.
- [ ] Ensure no regressions in existing breeding generation tests.
