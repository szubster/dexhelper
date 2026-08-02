---
id: task-337-368-zod-schema-integration-qa
type: TASK
title: QA Zod Schema Integration
status: READY
owner_persona: qa
created_at: '2026-07-30'
updated_at: '2026-08-02'
depends_on:
  - task-337-367-zod-schema-integration-impl
jules_session_id: null
pr_number: null
parent: story-334-337-zod-schema-integration
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# QA Zod Schema Integration

Run `.github/scripts` tests (`npx vitest run`) and verify that node parsing correctly handles both valid and malformed YAML frontmatters via Zod, ensuring no regressions.

## Acceptance Criteria
- [ ] Verify test suite passes (`cd .github/scripts && pnpm install && npx vitest run`)
- [ ] Ensure validation logic correctly rejects malformed schema and accepts valid schema

### QA Review
The implementation is rejected. The Zod schema in `schema.ts` for `created_at` and `updated_at` uses `z.string()`, which violates the constraint that it must gracefully handle JS Date objects for unquoted dates parsed by gray-matter.
