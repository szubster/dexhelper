---
id: task-640-691-extract-engine-data-to-core-v3
type: TASK
title: Migrate pure JS/TS logic from src/engine/data to packages/core (V3)
status: PENDING
owner_persona: coder
created_at: '2024-11-20'
updated_at: '2024-11-20'
depends_on:
  - task-640-690-qa-extract-utils-v3
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

# Migrate pure JS/TS logic from src/engine/data to packages/core (V3)

## Context
Extract the \`src/engine/data\` directory to \`packages/core/src/\`. Ensure you explicitly invoke the \`submit\` tool to open a PR.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from \`src/engine/data/\` to \`packages/core/src/\`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
