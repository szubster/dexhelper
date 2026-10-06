---
id: adr-586-665-false-permanent-failure-tracking
type: ADR
title: Architecture for False Permanent Failure Tracking
status: READY
owner_persona: architect
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# ADR: Architecture for False Permanent Failure Tracking

## Objective
Define the technical architecture for distinguishing between system crashes and domain rejections in the Orchestrator, and tracking them via a new YAML counter.

## Acceptance Criteria
- [ ] Write an ADR detailing the system vs domain failure architecture.
- [ ] Outline the exact YAML frontmatter changes (`system_failure_count`).
