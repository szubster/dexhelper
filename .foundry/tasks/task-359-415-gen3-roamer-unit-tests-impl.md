---
id: task-359-415-gen3-roamer-unit-tests-impl
type: TASK
title: Impl Gen 3 Roamer Unit Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-08-10'
updated_at: '2026-08-11'
depends_on: []
jules_session_id: '4771823620881667962'
pr_number: null
parent: story-397-359-gen3-roamer-unit-tests
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Impl Gen 3 Roamer Unit Tests

## Objective
Implement unit tests verifying the extraction of the Gen 3 Roamer struct against known good save fixtures for each game version.

## Acceptance Criteria
- [ ] Create unit tests for Emerald `Roamer` struct parsing.
- [ ] Create unit tests for Ruby/Sapphire `Roamer` struct parsing.
- [ ] Create unit tests for FireRed/LeafGreen `Roamer` struct parsing.
- [ ] Tests must verify the extraction of IVs, Personality Value, Species, HP, Level, Status, and Active boolean. Note: Programmatic DataView mock buffers are acceptable as fixtures since binary `.sav` fixtures for Gen 3 are currently unavailable.
