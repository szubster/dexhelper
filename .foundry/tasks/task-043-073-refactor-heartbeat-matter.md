---
id: task-043-073-refactor-heartbeat-matter
type: TASK
title: Refactor heartbeat script to use gray-matter
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-043-migrate-heartbeat-to-gray-matter
tags:
  - foundry
  - orchestrator
  - bugfix
research_references:
  - 006-gray-matter-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Refactor heartbeat script to use gray-matter

## Context
As per [ADR 006](.foundry/docs/adrs/006-gray-matter-parsing.md), we are migrating away from custom regex manipulations for Markdown frontmatter to use the `gray-matter` library. The `.github/scripts/foundry-heartbeat.ts` script currently uses regex to modify frontmatter in three functions:
- `transitionNodeToFailed`
- `transitionNodeToReady`
- `transitionNodeToCompleted` (note: look for `transitionNodeToCompleted` or similar functions in the script, it may be imported or implemented further down)

## Requirements
1. Import `matter` from `gray-matter` in `.github/scripts/foundry-heartbeat.ts`.
2. Refactor `transitionNodeToFailed` to parse `node.rawContent` using `matter(node.rawContent)`.
   - Update `data.status = targetStatus`.
   - Update `data.jules_session_id = null`.
   - Update `data.updated_at = dateStr`.
   - Stringify back using `matter.stringify(parsed.content, parsed.data)` and write to file.
3. Refactor `transitionNodeToReady` similarly:
   - Update `data.status = "READY"`.
   - Update `data.jules_session_id = null`.
   - Increment `data.rejection_count = (data.rejection_count || 0) + 1`.
   - Update `data.updated_at = dateStr`.
   - Stringify back and write to file.
4. If there's a `transitionNodeToCompleted` function inside `foundry-heartbeat.ts`, refactor it. (If it uses `transitionNodeToCompleted` from `foundry-orchestrator.ts` or somewhere else, make sure it's updated or verify if it's already using `gray-matter`). Note: In this file, `transitionNodeToCompleted` might be imported or implemented, but based on the story, ensure any mutations in `foundry-heartbeat.ts` are covered.
5. Ensure that the original markdown body is preserved during `matter.stringify()`.

## Acceptance Criteria
- [x] Regex mutations in `foundry-heartbeat.ts` are completely removed.
- [x] `transitionNodeToFailed` and `transitionNodeToReady` use `gray-matter`.
- [x] The script executes without errors.
