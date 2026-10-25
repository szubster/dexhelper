---
id: epic-521-553-schema-linter-integration
type: EPIC
title: 'Schema Linter Integration: Package Scripts & Verification'
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-24'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
parent: prd-421-521-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Schema Linter Integration: Package Scripts & Verification

## Objectives
- Integrate the updated validation script into `package.json`.
- Add a `lint:foundry` script.
- Append `pnpm lint:foundry` to the main `lint` script.
- Ensure the script correctly parses arguments.

## Acceptance Criteria
- [x] Add `"lint:foundry"` to `package.json`.
- [x] Integrate `"lint:foundry"` into the main `"lint"` script in `package.json`.
- [x] Verify validation passes correctly on valid files and fails on malformed files.

- [x] story-553-605-package-scripts
- [x] story-553-606-package-scripts-e2e
