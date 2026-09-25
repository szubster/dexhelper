---
id: story-517-550-implement-node-age-filtering
type: STORY
title: Implement Node Age Filtering
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-06'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
parent: epic-346-517-archival-cleanup-core-engine
rejection_reason: ''
locks: []
---

# Implement Node Age Filtering

## Description
Implement the logic to filter nodes based on their age and type for the archival cleanup engine.

## Acceptance Criteria
- [x] Parse node age from file frontmatter (created_at/updated_at).
- [x] Identify transient nodes (TASK, STORY, EPIC, IDEA) exceeding the 90-day threshold.
- [x] Ensure high-value records (ADR, PRD, RESEARCH) are permanently retained.
- [x] task-550-567-node-age-filtering-core-logic
- [x] task-550-568-node-age-filtering-tests
- [x] task-550-569-node-age-filtering-qa
