---
id: epic-517-551-deterministic-archival-markdown-link-resolution
type: EPIC
title: Markdown Link Resolution for Archival
status: READY
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-152-517-deterministic-dag-tree-archival
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Markdown Link Resolution for Archival

## Objective
Update the DAG orchestrator to scan all active nodes and rewrite legacy markdown links to the strict Node ID schema.

## Acceptance Criteria
- [ ] Scan all active `.foundry/**/*.md` nodes (excluding journals/docs)
- [ ] Upgrade legacy path-based markdown links of archived nodes to strict Node ID schema
- [ ] Ensure location-agnostic raw ID format prevents active context breakage
- [ ] Generate E2E verification story
