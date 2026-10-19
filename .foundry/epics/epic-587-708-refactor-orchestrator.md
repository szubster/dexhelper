---
id: epic-587-708-refactor-orchestrator
type: EPIC
title: Refactor Orchestrator with YAML Parsing Utility
status: PENDING
owner_persona: story_owner
created_at: "2026-10-18"
updated_at: "2026-10-18"
depends_on:
  - epic-587-707-yaml-parsing-utility
jules_session_id: null
locks: []
pr_number: null
parent: prd-530-587-strict-frontmatter-yaml-parsing-rule
priority: 50
confidence_score: null
tags: []
research_references: []
rejection_count: 0
system_failure_count: 0
rejection_reason: ""
notes: ""
---

# Refactor Orchestrator with YAML Parsing Utility

## Overview
Refactor the main DAG Orchestrator (`packages/foundry/foundry-orchestrator.ts`) to rely on the newly developed strict frontmatter extraction utility, preventing execution bugs caused by generic regex matches against the file bodies.

## Acceptance Criteria
- [ ] Update `packages/foundry/foundry-orchestrator.ts` to utilize the new `parseFoundryNode` utility.
- [ ] Remove old regex-based extraction logic from the Orchestrator.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
