---
id: "story-010-015-enforce-strict-oxlint-rules"
type: "STORY"
title: "Fix disabled oxlint rules across the codebase"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-24"
updated_at: "2026-04-24"
jules_session_id: null
depends_on:
  - ".foundry/tasks/task-014-027-configure-oxlint-json.md"
parent: ".foundry/epics/epic-002-005-static-analysis.md"
---

# Fix disabled oxlint rules across the codebase

## Context
During the initial rollout of the strict `.oxlintrc.json` configuration, several strict rules were temporarily disabled to allow the initial configuration PR to pass without introducing a massive scope creep. These rules include:
- `vitest/require-mock-type-parameters`
- `vitest/expect-expect`
- `jest/no-standalone-expect`
- `jest/expect-expect`
- `jest/no-disabled-tests`
- `jest/no-conditional-expect`

## Goals
All disabled oxlint rules should be enabled back. The tech lead should create a new task per rule to fix those violations independently.

## Instructions for Tech Lead
1. Create a series of TASK nodes, one for each disabled rule.
2. Ensure each task focuses strictly on enabling that rule in `.oxlintrc.json` and fixing all corresponding violations across the codebase.
