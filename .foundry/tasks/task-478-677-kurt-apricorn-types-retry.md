---
id: task-478-677-kurt-apricorn-types-retry
type: TASK
title: Kurt Apricorn Parsing Types Retry
status: PENDING
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-478-676-investigate-kurt-apricorn-types-failure
jules_session_id: null
pr_number: null
parent: story-404-478-kurt-apricorn-parsing-logic
tags:
  - gen2
  - types
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Kurt Apricorn Parsing Types Retry

## Context
We need to extract Kurt's Apricorn crafting state from a Generation 2 save file. This task focuses on defining the TypeScript interfaces and types for the extraction logic. This is a retry of `task-478-667`.

## Objectives
- Review the findings in the `research-478-676-investigate-kurt-apricorn-types-failure` node.
- Define the data models for the extracted Kurt Apricorn data (e.g., Apricorn type, resulting Poké Ball, quantity, crafting timestamp or day flag) based on the research.
- Ensure strict typing for Gen 2 item IDs related to Apricorns and Poké Balls.

## Acceptance Criteria
- [ ] Implement the TypeScript interfaces for the Apricorn crafting state in the appropriate domain folder as specified by the research node.
