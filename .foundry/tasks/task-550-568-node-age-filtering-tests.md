---
id: task-550-568-node-age-filtering-tests
type: TASK
title: Implement Node Age Filtering Tests
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-16'
depends_on:
  - task-550-567-node-age-filtering-core-logic
jules_session_id: null
parent: story-517-550-implement-node-age-filtering
rejection_reason: ''
locks: []
---

# Implement Node Age Filtering Tests

## Description
Implement unit tests for the node age filtering logic and frontmatter parsing.

## Acceptance Criteria
- [x] Write tests for the frontmatter parsing function.
- [x] Write tests for identifying transient nodes exceeding the 90-day threshold.
- [x] Write tests verifying that high-value records are permanently retained.
