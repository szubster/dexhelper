---
id: task-550-569-node-age-filtering-qa
type: TASK
title: "QA Node Age Filtering"
status: READY
owner_persona: "qa"
created_at: "2026-09-06"
updated_at: "2026-09-06"
depends_on: ["task-550-568-node-age-filtering-tests"]
parent: story-517-550-implement-node-age-filtering
jules_session_id: null
rejection_reason: ""
---

# QA Node Age Filtering

## Description
Perform QA verification for the node age filtering logic.

## Acceptance Criteria
- [ ] Verify that frontmatter parsing correctly extracts `created_at` and `updated_at`.
- [ ] Verify that transient nodes older than 90 days are identified for cleanup.
- [ ] Verify that high-value records (ADR, PRD, RESEARCH) are never flagged for cleanup, regardless of age.
