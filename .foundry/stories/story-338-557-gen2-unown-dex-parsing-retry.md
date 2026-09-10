---
id: story-338-557-gen2-unown-dex-parsing-retry
type: STORY
title: Parse Gen 2 Caught Unown Forms Retry
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on:
  - research-338-556-investigate-unown-parsing-timeout
jules_session_id: null
parent: epic-118-338-gen2-unown-dex-data-extraction
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
locks: []
---

# Parse Gen 2 Caught Unown Forms Retry

## Context
As part of the Gen 2 Unown Dex Progress Tracker epic, we need to extract the caught Unown forms from the save file. This is a retry of the permanently failed `story-338-477-gen2-unown-dex-parsing`. We must apply the findings from the research investigation before attempting implementation again.

## Acceptance Criteria
- [ ] Break down into Tasks
- [ ] Implement parsing logic to extract the caught Unown forms from Gen 2 save data.
- [ ] Ensure unit tests are added to verify correct parsing of Unown Dex data.