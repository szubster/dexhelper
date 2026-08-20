---
id: story-398-432-save-state-read-api
type: STORY
title: Implement Save State Read API
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on:
  - story-398-431-save-state-write-api
jules_session_id: null
pr_number: null
parent: epic-099-398-save-state-read-write-api-retry
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Implement Save State Read API

## Overview
Implement the read API to retrieve the most recent save state for a playthrough, as well as the previous state relative to a given state for diffing purposes. This fulfills the second and third acceptance criteria of `epic-099-398-save-state-read-write-api-retry`.

## Acceptance Criteria
- [ ] Implement a function to retrieve the most recent save state for a specified playthrough ID.
- [ ] Implement a function to retrieve the previous state relative to a given save state ID (for diffing purposes).
- [ ] Ensure queries effectively utilize the indexes in the `SaveHistoryDB` schema.
- [ ] Write unit tests for the read API.
