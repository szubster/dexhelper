---
id: task-562-578-gen3-missed-items-parsing-types-coder
type: TASK
title: Gen 3 Missed Items & Milestones Types Definition
status: READY
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
rejection_reason: ''
---

# Task: Gen 3 Missed Items & Milestones Types Definition

## Description
Define the necessary TypeScript interfaces and structs for the missed milestones and items data structures that will be parsed from a Gen 3 save file.

## Acceptance Criteria
- [ ] Define `MissedMilestone` and `MissedItem` structs.
- [ ] Ensure proper naming schemas (e.g., `captureRate` not `cr`).
- [ ] Ensure `msgpackr` with `useRecords: true` is considered for serialization.
