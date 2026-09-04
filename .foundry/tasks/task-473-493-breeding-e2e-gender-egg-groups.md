---
id: task-473-493-breeding-e2e-gender-egg-groups
type: TASK
title: Implement Gen 2 E2E Tests for Gender and Egg Groups
status: READY
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-309-473-shiny-breeding-logic-e2e
tags:
  - gen2
  - breeding
  - logic
  - e2e
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
  - .foundry/docs/knowledge_base/development/gen2_breeding_dv_overlap.md
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 2 E2E Tests for Gender and Egg Groups

## Description
Implement Playwright E2E tests for the Gen 2 Shiny Breeding engine specifically targeting gender calculation and egg group validation logic within the UI.

## Acceptance Criteria
- [x] Write Playwright E2E tests covering gender calculation UI workflows.
- [x] Write Playwright E2E tests covering egg group validation rendering.
- [x] Ensure tests do not duplicate logic inside page.evaluate().
