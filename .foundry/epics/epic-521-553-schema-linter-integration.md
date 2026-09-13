---
id: epic-521-553-schema-linter-integration
type: EPIC
title: 'Schema Linter Integration: Package Scripts & Verification'
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-24'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: '16635256143762574784'
parent: prd-421-521-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 0
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
- [ ] Add `"lint:foundry"` to `package.json`.
- [ ] Integrate `"lint:foundry"` into the main `"lint"` script in `package.json`.
- [ ] Verify validation passes correctly on valid files and fails on malformed files.
