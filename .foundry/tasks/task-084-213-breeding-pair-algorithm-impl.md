---
id: task-084-213-breeding-pair-algorithm-impl
type: TASK
title: Implement Shiny Carrier Breeding Pair Algorithm
status: PENDING
owner_persona: coder
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - story-044-083-pc-party-shiny-flag
  - task-084-211-gen2-gender-computation-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Shiny Carrier Breeding Pair Algorithm

## Objective
Implement the core backend algorithm to calculate valid breeding pairs prioritized by Shiny Carrier status, utilizing the new Gen 2 gender computation utility.

## Technical Contract
- Create a function to cross-reference Gen 2 Egg Groups, Genders, and Shiny Carrier status.
- Prioritize pairs where at least one parent is a Shiny Carrier.
- Use the new Gen 2 gender computation utility for accurate gender determination.

## Acceptance Criteria
- [ ] Algorithm correctly matches valid Gen 2 breeding pairs.
- [ ] Output explicitly highlights/prioritizes pairs involving Shiny Carriers.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.