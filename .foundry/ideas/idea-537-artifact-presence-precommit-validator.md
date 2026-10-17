---
id: idea-537-artifact-presence-precommit-validator
type: IDEA
title: Automated Pre-Commit Deliverable Artifact Presence Validator
status: FAILED
owner_persona: product_manager
created_at: '2026-10-14'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - testing
  - linter
  - validation
  - workflow
rejection_count: 0
rejection_reason: ACTIVE node missing or malformed session ID
locks: []
priority: 80
---

# Idea: Automated Pre-Commit Deliverable Artifact Presence Validator

## Problem
In several task sessions (e.g. `task-478-617-msgpack-prefetch-integration-tests`), Coder agents marked implementation tasks as COMPLETED without saving or staging the required source code or integration test deliverable files. This resulted in empty pull requests and downstream QA rejections due to missing test files or missing implementation code.

## Proposed Solution
Build an automated pre-commit / linter validation tool (e.g. in `.github/scripts/` or integrated with Lefthook/Biome) that:
1. Parses the active TASK node's acceptance criteria and deliverable references to extract expected file paths.
2. Checks git status and disk presence to ensure specified deliverable source/test files exist, are staged, and are non-empty.
3. Blocks session completion or flags pre-commit failure if expected deliverable files are omitted or left unstaged.

## Value
Eliminates false-positive task completions, reduces transient QA rejection loops, and enforces delivery accountability across coder sessions.

## Acceptance Criteria
- [ ] PRD generated detailing the artifact presence pre-commit validator specifications.
- [ ] Automated validation utility implemented in `.github/scripts/`.
