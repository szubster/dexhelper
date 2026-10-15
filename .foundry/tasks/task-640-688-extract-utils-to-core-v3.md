---
id: task-640-688-extract-utils-to-core-v3
type: TASK
title: Migrate pure JS/TS logic from src/utils to packages/core (V3)
status: READY
owner_persona: coder
created_at: '2024-11-20'
updated_at: '2024-11-20'
depends_on:
  - research-640-687-investigate-extract-utils-timeout-retry
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

# Migrate pure JS/TS logic from src/utils to packages/core (V3)

## Context
As part of the domain extraction, we will extract the \`src/utils\` directory to \`packages/core/src/\`. Follow the recommendations from the research task to avoid failing again. Ensure you explicitly invoke the \`submit\` tool to open a PR.

## Acceptance Criteria
- [ ] Move non-DOM, non-React specific files from \`src/utils/\` to \`packages/core/src/\`.
- [ ] Ensure no React or DOM dependencies are introduced or remain in the migrated files.
