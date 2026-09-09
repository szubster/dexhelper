---
id: story-517-552-archival-cleanup-core-e2e
type: STORY
title: "Archival Cleanup Core E2E Verification"
status: READY
owner_persona: "tech_lead"
created_at: "2026-09-06"
updated_at: "2026-09-06"
depends_on: ["story-517-550-implement-node-age-filtering", "story-517-551-implement-deletion-chunking"]
parent: epic-346-517-archival-cleanup-core-engine
jules_session_id: null
rejection_reason: ""
tags:
  - e2e
---

# Archival Cleanup Core E2E Verification

## Description
Develop an end-to-end integration test suite that verifies the core archival cleanup engine works correctly.

## Acceptance Criteria
- [ ] Verify nodes older than 90 days are pruned.
- [ ] Verify high-value nodes (ADR, PRD, RESEARCH) are skipped and retained.
- [ ] Verify the engine limits deletions to a maximum of 50 files per run.
