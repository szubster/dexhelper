---
id: task-550-567-node-age-filtering-core-logic
type: TASK
title: "Implement Node Age Filtering Core Logic"
status: READY
owner_persona: "coder"
created_at: "2026-09-06"
updated_at: "2026-09-06"
depends_on: []
parent: story-517-550-implement-node-age-filtering
jules_session_id: null
rejection_reason: ""
---

# Implement Node Age Filtering Core Logic

## Description
Implement the core logic to parse node frontmatter and filter nodes based on their age and type for the archival cleanup engine.

## Acceptance Criteria
- [ ] Implement a function to parse node age from file frontmatter (`created_at`/`updated_at`).
- [ ] Implement logic to identify transient nodes (TASK, STORY, EPIC, IDEA) exceeding the 90-day threshold.
- [ ] Implement logic to ensure high-value records (ADR, PRD, RESEARCH) are permanently retained.
