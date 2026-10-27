---
id: prd-530-587-strict-frontmatter-yaml-parsing-rule
type: PRD
title: Strict Frontmatter YAML Parsing Rule implementation
status: FAILED
owner_persona: epic_planner
created_at: '2026-10-14'
updated_at: '2026-10-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-530-strict-frontmatter-yaml-parsing-rule
rejection_count: 0
rejection_reason: 'Session terminated with state: NOT_FOUND'
notes: ''
locks: []
priority: 50
---

# PRD: Strict Frontmatter YAML Parsing Rule implementation

## Overview
Recent QA analysis revealed bugs caused by using global regex matches (like `status:`) on entire `.foundry` markdown files. This PRD details the implementation of strict YAML frontmatter isolation to prevent these false-positive matches and ensure correct DAG execution.

## Objectives
1. Centralize and standardize frontmatter extraction.
2. Refactor existing scripts to use the new standard.
3. Prevent future regressions through linting/validation.

## Scope
- Implement a core utility (e.g., `parseFoundryNode`) in `.github/scripts/`.
- Refactor the Orchestrator (`packages/foundry/foundry-orchestrator.ts`) to use strict isolation.
- Update relevant utility scripts and linters to adopt this pattern.

## Acceptance Criteria
- [ ] epic-587-707-yaml-parsing-utility
- [ ] epic-587-708-refactor-orchestrator
- [ ] epic-587-709-update-scripts-and-linters
