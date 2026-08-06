---
id: epic-115-331-remove-orphaned-qa-task-rule-from-docs
type: EPIC
title: Remove Orphaned QA Task Rule From Docs
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-16'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: '17076530118640348393'
pr_number: null
parent: prd-115-115-remove-obsolete-orphaned-node-manual-cancellation
tags:
  - docs
  - agile-coach
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Remove Orphaned QA Task Rule From Docs

## Description
The obsolete "Orphaned QA Task Cancellation Rule" needs to be completely removed from system documentation. Although the orchestrator automatically handles cascaded cancellations (Phase 3.6), there are still instructions within `.foundry/docs/` and `.foundry/docs/knowledge_base/` telling personas to manually modify the markdown bodies of orphaned tasks. This creates confusion and merge conflicts.

This epic covers scanning the documentation (specifically `core_policies.md` and related agent docs) and removing any instruction regarding the manual cancellation of orphaned tasks.

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into Stories.
- [x] story-331-333-remove-orphaned-qa-rule
