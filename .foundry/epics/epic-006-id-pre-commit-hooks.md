---
id: epic-006-id-pre-commit-hooks
type: EPIC
title: "ID Integrity Pre-Commit Validation"
status: READY
owner_persona: story_owner
created_at: "2026-04-21"
updated_at: "2026-04-22"
depends_on:
  - .foundry/epics/epic-004-distributed-id-schema.md
jules_session_id: null
parent: .foundry/prds/prd-001-distributed-ids.md
tags: ["ci", "pre-commit"]
rejection_count: 0
notes: ""
---

# Epic: ID Integrity Pre-Commit Validation

## Overview
To guarantee the collision-free nature of the new node ID scheme across the multi-agent system, this epic evaluates and implements automated validation. This could take the form of either local pre-commit hooks or a CI pipeline check on a post-merge virtual branch, ensuring that no two nodes share the same `id` before they are fully integrated, safeguarding the `.foundry/` directory's integrity.

## Scope
1. **Hook Implementation:** Implement or extend existing git pre-commit hooks to parse YAML frontmatter across the entire `.foundry` directory tree.
2. **Uniqueness Validation:** Add logic to enforce that every `id` field is unique globally within the directory.
3. **Format Validation:** Verify that newly created node IDs match the structural format chosen in `epic-004-distributed-id-schema`.

## Dependencies
- `.foundry/epics/epic-004-distributed-id-schema.md` (Must finalize the ID pattern first).

## High-Level Acceptance Criteria
- [ ] A pre-commit hook runs on every commit affecting `.foundry/` files.
- [ ] Commits are rejected if duplicate `id` fields are detected in the frontmatter.
- [ ] Commits are rejected if the node ID format violates the new schema convention.
