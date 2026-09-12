---
id: research-470-553-investigate-japanese-crystal-offsets
type: RESEARCH
title: Investigate Japanese Crystal Save Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-07'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: '17747645014488595709'
pr_number: null
parent: story-428-470-identify-public-saves
tags:
  - testing
  - fixtures
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Japanese Crystal Save Offsets

## Context
Task `task-470-487-catalog-integrate-saves` failed due to a timeout/max rejection after QA failed on `crystal-bxtj-0.sav`. The Japanese copy of Pokémon Crystal uses different memory offsets (e.g., party data at `0x281a` instead of `0x2865`). Our save parsing engine currently only supports Western Gen 2 offsets.

## Requirements
1. Determine the necessary offset shifts and memory maps for Japanese Gen 2 (specifically Crystal) saves.
2. Determine how to implement detection fallbacks or whether the fixture should be replaced.

## Acceptance Criteria
- [x] Offsets for Japanese Crystal are documented.
- [x] Recommendation is made on how to handle the Japanese Crystal save parsing or replacement.

## Findings
See [Japanese Crystal Offsets](.foundry/docs/knowledge_base/save_engine/japanese_crystal_offsets.md) for full details.
