---
id: task-546-565-qa-generator-save-parsers
type: TASK
title: QA Gen 1-3 Save Parser Generators
status: PENDING
owner_persona: qa
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-546-562-gen1-parser-generators
  - task-546-563-gen2-parser-generators
  - task-546-564-gen3-parser-generators
jules_session_id: null
locks: []
pr_number: null
parent: story-537-546-generator-save-file-parsers
tags:
  - qa
  - typescript
  - typescript-7
  - generators
  - architecture
  - performance
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA Gen 1-3 Save Parser Generators

## Description
QA verification for the refactoring of Gen 1, Gen 2, and Gen 3 save parsers to use TypeScript generator functions per ADR 154.

## Acceptance Criteria
- [ ] Verify that Gen 1, Gen 2, and Gen 3 parsers use generator functions for parsing PC boxes and parties.
- [ ] Verify all parser tests pass cleanly and there are no regressions in data loading.
- [ ] Verify type stripping compilation succeeds with the new syntax.
