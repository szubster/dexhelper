---
id: story-551-556-orchestrator-link-resolution-implementation
type: STORY
title: Orchestrator Link Resolution Implementation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: '14441819888021979538'
pr_number: null
parent: epic-517-551-deterministic-archival-markdown-link-resolution
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Orchestrator Link Resolution Implementation

## Objective
Update the DAG orchestrator to scan all active nodes and rewrite legacy markdown links to the strict Node ID schema.

## Acceptance Criteria
- [ ] Implement active node scanning
- [ ] Upgrade legacy path-based markdown links
- [ ] Ensure location-agnostic raw ID format
