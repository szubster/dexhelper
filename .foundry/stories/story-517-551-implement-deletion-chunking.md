---
id: story-517-551-implement-deletion-chunking
type: STORY
title: "Implement Deletion Chunking"
status: READY
owner_persona: "tech_lead"
created_at: "2026-09-06"
updated_at: "2026-09-06"
depends_on: ["story-517-550-implement-node-age-filtering"]
parent: epic-346-517-archival-cleanup-core-engine
jules_session_id: null
rejection_reason: ""
---

# Implement Deletion Chunking

## Description
Implement the chunking logic to limit deletions per execution cycle, prioritizing the oldest files.

## Acceptance Criteria
- [ ] Sort eligible nodes to prioritize the oldest files first.
- [ ] Limit the deletion queue to a maximum of 50 nodes per execution cycle.
