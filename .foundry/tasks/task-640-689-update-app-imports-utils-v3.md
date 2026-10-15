---
id: task-640-689-update-app-imports-utils-v3
type: TASK
title: Update imports for utils extracted to core package (V3)
status: PENDING
owner_persona: coder
created_at: '2024-11-20'
updated_at: '2024-11-20'
depends_on:
  - task-640-688-extract-utils-to-core-v3
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

# Update imports for utils extracted to core package (V3)

## Context
Following the extraction of utils to the core package, update the imports in the main application.

## Acceptance Criteria
- [ ] Update imports for migrated util files in \`src/\` to point to \`@dexhelper/core\`.
- [ ] Ensure the main app builds successfully after import updates.
