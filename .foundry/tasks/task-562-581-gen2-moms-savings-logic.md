---
id: task-562-581-gen2-moms-savings-logic
type: TASK
title: Implement Gen 2 Mom's Savings Threshold Logic & Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-09-15T11:52:50Z'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: '11762460996498962145'
pr_number: null
parent: story-312-562-gen2-mom-savings-tracker-ui-core
tags:
  - gen2
  - logic
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 2 Mom's Savings Threshold Logic & Tests

## Overview
Create a utility function to determine the progression toward room decoration thresholds unlocked via Mom's savings in Gen 2.

## Requirements
- Create a new utility file (e.g., `src/utils/gen2Savings.ts`).
- Define constant thresholds for Mom's savings decorations:
  - $10,000: Charmander Doll
  - $30,000: Clefairy Doll
  - $50,000: Pikachu Doll
  - $100,000: Big Snorlax
- Write a function that takes the current savings `money` and returns an object containing:
  - The next threshold amount.
  - The name of the next decoration.
  - The amount remaining to reach the next threshold.
  - A boolean indicating if all thresholds have been reached.
- Write comprehensive unit tests for this utility function using Vitest.

## Acceptance Criteria
- [x] Utility function and constants are defined and exported.
- [x] Unit tests are written and pass.
