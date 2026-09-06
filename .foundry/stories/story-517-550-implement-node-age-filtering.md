---
id: story-517-550-implement-node-age-filtering
type: STORY
title: "Implement Node Age Filtering"
status: READY
owner_persona: "tech_lead"
created_at: "2026-09-06"
updated_at: "2026-09-06"
depends_on: []
parent: epic-346-517-archival-cleanup-core-engine
jules_session_id: null
rejection_reason: ""
---

# Implement Node Age Filtering

## Description
Implement the logic to filter nodes based on their age and type for the archival cleanup engine.

## Acceptance Criteria
- [ ] Parse node age from file frontmatter (created_at/updated_at).
- [ ] Identify transient nodes (TASK, STORY, EPIC, IDEA) exceeding the 90-day threshold.
- [ ] Ensure high-value records (ADR, PRD, RESEARCH) are permanently retained.
