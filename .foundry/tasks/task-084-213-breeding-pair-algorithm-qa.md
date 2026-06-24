---
id: task-084-213-breeding-pair-algorithm-qa
type: TASK
title: QA - Update DB Schema and Generate Script for Egg Groups
status: PENDING
owner_persona: qa
created_at: '2026-06-25'
updated_at: '2026-06-25'
depends_on:
  - task-084-212-breeding-pair-algorithm-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - backend
  - data
  - gen2
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Update DB Schema and Generate Script for Egg Groups

## Objective
Verify that `PokemonMetadata` properly includes egg groups and that the generator script populates it correctly. Verify the Gen 2 gender calculation utility.

## Testing Contract
- Run the code generation script and verify the resulting mock DB data or JSON outputs contain valid egg group lists for Pokemon.
- Verify that unit tests for the Gen 2 gender calculation pass and handle edge cases (e.g. 100% female, 100% male, genderless).

## Acceptance Criteria
- [ ] DB generation correctly includes egg groups in the `PokemonMetadata`.
- [ ] Gender calculation logic accurately reflects Gen 2 mechanics based on Attack DV and `gr`.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
