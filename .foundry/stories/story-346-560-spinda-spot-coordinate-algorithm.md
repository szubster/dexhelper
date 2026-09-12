---
id: story-346-560-spinda-spot-coordinate-algorithm
type: STORY
title: Spinda Spot Coordinate Algorithm
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-335-346-spinda-pattern-rendering-engine
tags:
  - gen3
  - spinda
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Spinda Spot Coordinate Algorithm

## Description
This story focuses on implementing the pure algorithm that takes a 32-bit Spinda PID (Personality ID) and calculates the (X, Y) coordinates for its 4 spots based on Gen 3 mechanics. Each byte of the 32-bit PID determines the location of one spot.

## Acceptance Criteria
- [ ] Implement a function to parse the 32-bit PID into 4 distinct bytes.
- [ ] Implement the coordinate mapping logic to translate each byte into specific X and Y offsets for the four spots (top-left, top-right, bottom-left, bottom-right).
- [ ] Add unit tests verifying the coordinate mapping matches known Gen 3 Spinda patterns.