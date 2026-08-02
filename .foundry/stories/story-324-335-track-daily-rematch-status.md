---
id: story-324-335-track-daily-rematch-status
type: STORY
title: Track Gen 3 Secret Base Daily Rematch Status (v2)
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-08-02'
depends_on:
  - story-324-334-extract-mixed-record-trainer-data
jules_session_id: '5103666048886432530'
pr_number: null
parent: epic-045-324-gen3-secret-base-parsing-v2
tags:
  - feature
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Track Gen 3 Secret Base Daily Rematch Status (v2)

## Context
Players can battle the NPC trainers in Secret Bases once per day. We need to track whether the player has already battled them today.

## Objectives
- Identify the flag or value in the save file that indicates if an NPC trainer in a Secret Base has been battled today.
- Integrate this status into the extracted trainer data so the UI can display availability.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks.
- [ ] task-335-386-track-daily-rematch-status-impl
- [ ] task-335-387-track-daily-rematch-status-qa
