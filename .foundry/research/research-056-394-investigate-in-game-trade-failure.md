---
id: research-056-394-investigate-in-game-trade-failure
type: RESEARCH
title: Investigate In-Game Trade Data Extraction Failure
status: PENDING
owner_persona: researcher
created_at: "2026-08-04"
updated_at: "2026-08-04"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---
# Investigate In-Game Trade Data Extraction Failure

## Context
The previous attempt to extract in-game NPC trade data (epic-095-119-in-game-trade-data-extraction) failed permanently after reaching the maximum rejection count. We need to identify the root cause, which may be related to missing or incorrect memory offsets, or issues mapping the bitflags correctly.

## Objectives
- Investigate the root cause of the failure in `epic-095-119-in-game-trade-data-extraction`.
- Determine the correct memory offsets for Gen 2 and Gen 3 NPC trade flags.
- Document findings so that the replacement Epic can be implemented successfully.
