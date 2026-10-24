---
id: epic-587-709-update-scripts-and-linters
type: EPIC
title: Update Scripts and Linters for Strict YAML Parsing
status: PENDING
owner_persona: story_owner
created_at: "2026-10-18"
updated_at: "2026-10-18"
depends_on:
  - epic-587-708-refactor-orchestrator
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

# Update Scripts and Linters for Strict YAML Parsing

## Overview
Adopt the new `parseFoundryNode` utility across other ecosystem scripts and introduce linting/validation rules to prevent regressions where developers might accidentally use global regex for frontmatter data extraction.

## Acceptance Criteria
- [ ] Refactor relevant ecosystem utility scripts to use `parseFoundryNode`.
- [ ] Implement linting or validation logic to block future global regex extraction of frontmatter.
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
