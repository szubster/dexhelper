---
id: task-413-440-verify-librarian-schema-e2e
type: TASK
title: Verify Librarian Schema Updates E2E
status: PENDING
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-409-413-librarian-schema-e2e
tags:
  - foundry
  - schema
  - documentation
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Librarian Schema Updates E2E

## Description
This task involves writing a Playwright E2E test to verify that the `librarian` persona has been correctly added to the `.foundry/docs/schema.md` file.

## Acceptance Criteria
- [ ] Create a new Playwright test file in `tests/e2e/` (e.g. `tests/e2e/librarian_schema.spec.ts`).
- [ ] Implement a test that reads `.foundry/docs/schema.md` and verifies the exact phrase `librarian` and its description `"Mapped to Snorlax (#143). Responsible for context token optimization by digesting historical data and pruning stale entries."` are present in Section 5 (Owner Persona Enum).
- [ ] Ensure the test passes locally via `pnpm test:e2e`.