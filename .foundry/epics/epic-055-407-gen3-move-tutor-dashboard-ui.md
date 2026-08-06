---
id: epic-055-407-gen3-move-tutor-dashboard-ui
type: EPIC
title: "Gen 3 Move Tutor Dashboard UI"
status: PENDING
owner_persona: "story_owner"
created_at: "2026-08-06"
updated_at: "2026-08-06"
depends_on:
  - epic-055-406-gen3-move-tutor-compatibility
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags: ["gen3", "move-tutor", "ui"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Move Tutor Dashboard UI

Create a dedicated dashboard view for Move Tutors. Display a list of all one-time Move Tutors, distinguishing between "Available" and "Used" tutors based on save file flags. Visually adhere to the tactical hardware/snooping aesthetic (ADR 008).

## Integration & E2E Requirements
This epic MUST generate a final STORY dedicated exclusively to Integration and E2E Verification.

## Acceptance Criteria
- [ ] Dashboard UI displays available and used Move Tutors clearly, adhering to the tactical aesthetic (sharp edges, dashed borders, monospaced telemetry fonts).
- [ ] A list of compatible Pokémon from the player's save file (PC/Party) is displayed for each available tutor.