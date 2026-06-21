---
id: research-128-212-missing-vite-plugin-integration
type: RESEARCH
title: Investigate Missing Vite Plugin Integration for items.jsonl
status: PENDING
owner_persona: researcher
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-087-128-dynamic-item-list-parsing
tags:
  - refactor
  - build
  - db
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Missing Vite Plugin Integration for items.jsonl

## Objective
Document exactly how `vite-plugins/pokedata-plugin.ts` needs to be modified to ingest the dynamically generated `items.jsonl` data and include it in the `pokedata.msgpack` payload, per the requirements in ADR-049-025.

## Context
During the initial implementation of the dynamic item list (`task-128-181-implement-item-list-parsing`), the generation logic in `scripts/generate-pokedata.ts` was implemented correctly, but the task was ultimately rejected because the newly generated `items.jsonl` file was never integrated into the application payload via the Vite plugin. The coder forgot to update `vite-plugins/pokedata-plugin.ts`.

## Acceptance Criteria
- [ ] Determine the specific lines or functions in `vite-plugins/pokedata-plugin.ts` that need updating to read `items.jsonl`.
- [ ] Document the necessary modifications to include `items` in the final msgpackr payload.
