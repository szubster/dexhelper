---
id: task-640-690-qa-extract-utils-v3
type: TASK
title: QA - Verify utils extraction to core package (V3)
status: PENDING
owner_persona: qa
created_at: '2024-11-20'
updated_at: '2024-11-20'
depends_on:
  - task-640-689-update-app-imports-utils-v3
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
research_references: []
notes: ''
locks: []
---

# QA - Verify utils extraction to core package (V3)

## Context
Verify that the \`src/utils\` extraction was successful and hasn't broken existing functionality.

## Acceptance Criteria
- [ ] Run test suite to verify no regressions.
- [ ] Verify that no DOM/React dependencies are present in \`@dexhelper/core\` utils.
