---
id: task-431-451-fame-checker-notable-npcs-impl
type: TASK
title: Investigate Fame Checker Event Flags for Notable NPCs
status: READY
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on: []
parent: story-331-431-conduct-fame-checker-research
---

# Task: Investigate Fame Checker Event Flags for Notable NPCs

## Context
As part of the effort to extract Fame Checker progress from Pokémon FireRed and LeafGreen save files (`epic-115-331-gen3-fame-checker-research`), we need to investigate and document the exact event flags and bitmasks used. This data will later power the extraction logic. This task focuses specifically on notable NPCs (e.g., Oak, Daisy, Bill).

## Description
Investigate FireRed/LeafGreen save file memory layouts for Fame Checker event flags specifically for notable NPCs (e.g., Oak, Daisy, Bill).

## Acceptance Criteria
- [ ] Create a markdown document mapping in-game entries to event flags for notable NPCs within `.foundry/docs/knowledge_base/gen3_fame_checker_notable_npcs.md`.
