---
id: research-578-587-gen3-wild-item-fixtures
type: RESEARCH
title: Locate Authentic Gen 3 Saves for Wild Item Testing
status: FAILED
owner_persona: researcher
created_at: '2026-09-20'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-563-578-save-file-progress-fixtures-coder
tags:
  - fixtures
  - e2e
  - gen3
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Merged with unfulfilled acceptance criteria'
notes: ''
locks: []
priority: 50
---

# Locate Authentic Gen 3 Saves for Wild Item Testing

## Context
Task `task-563-578-save-file-progress-fixtures-coder` requires mocking or creating `.sav` file generation scripts for Gen 3 to test Wild Item tracking. We need to create a test fixture for a Gen 3 save file containing a target item (like an Oran Berry or Lucky Egg) and another missing the item.

According to memory and `ADR 032`/Save File parsing rules: "Do not create or manipulate Pokemon save file fixtures (.sav) by manually editing bytes via scripts, as this enforces incorrect assumptions about file structure. Use authentic save files or trusted 3rd-party manipulation tools (e.g., PKHeX) instead. Spawn a RESEARCH node if authentic saves need to be located."

I must spawn this RESEARCH node to assign the `researcher` persona the task of locating or generating authentic Gen 3 save files using PKHeX or an emulator.

## Acceptance Criteria
- [ ] Locate or generate an authentic Gen 3 `.sav` file (e.g., Emerald) with a target item (like an Oran Berry).
- [ ] Locate or generate an authentic Gen 3 `.sav` file missing the target item.
- [ ] Update `tests/fixtures/README.md` and add the files to `tests/fixtures/wild-item/` or provide them so the coder can use them.
