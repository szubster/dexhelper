---
id: story-150-293-gen3-roamer-iv-glitch-detection-logic
type: STORY
title: Gen 3 Roamer IV Glitch Detection Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-08'
updated_at: '2026-07-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-044-150-gen3-roamer-iv-glitch-v4
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Gen 3 Roamer IV Glitch Detection Logic

## Objective
Detect the IV glitch signature from extracted roamer IVs.

## Description
Implement logic to analyze the 32-bit IV field. The glitch causes the HP, Defense, Sp. Atk, Sp. Def, and Speed IVs to be limited to very low values.

## Acceptance Criteria
- [ ] Implement a glitch detection function that identifies the glitched IV signature.
- [ ] Write unit tests with glitched and non-glitched IV examples.
- [ ] Tech Lead: Break down this Story into executable Tasks.
