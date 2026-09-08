---
id: epic-521-554-schema-linter-lefthook-integration
type: EPIC
title: "Schema Linter Integration: Lefthook Pre-commit"
status: PENDING
owner_persona: story_owner
created_at: "2026-08-24"
updated_at: "2026-08-24"
depends_on: []
jules_session_id: null
parent: prd-421-521-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Schema Linter Integration: Lefthook Pre-commit

## Objectives
- Integrate the schema validation script into `lefthook.yml`.
- Ensure it runs automatically on `git commit` to fail fast locally.

## Acceptance Criteria
- [ ] Add the script to `lefthook.yml` under the `pre-commit` hook.
- [ ] Verify that committing malformed files correctly aborts the pre-commit hook.
