---
id: task-470-554-catalog-integrate-saves-replacement
type: TASK
title: Catalog and Integrate Public Saves (Replacement)
status: PENDING
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on:
  - research-470-553-investigate-japanese-crystal-offsets
jules_session_id: null
pr_number: null
parent: story-428-470-identify-public-saves
tags:
  - testing
  - fixtures
research_references:
  - .foundry/research/research-470-553-investigate-japanese-crystal-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Catalog and Integrate Public Saves (Replacement)

## Context
After sourcing public save files for Generations 1, 2, and 3, they need to be properly organized, renamed, and integrated into our test fixtures directory. A previous attempt failed due to an unsupported Japanese Crystal save file (`crystal-bxtj-0.sav`).

## Requirements
1. Consolidate the downloaded save files from the sourcing tasks.
2. Rename the files using a standardized naming convention (e.g., `[version]-[progress-state].sav`).
3. Place them in the `tests/fixtures/` directory.
4. Document the characteristics of each new save file in a markdown or JSON registry within the fixtures directory if one exists, or add a README.
5. Apply the findings from the research task to either properly parse the Japanese Crystal save or replace it.

## Acceptance Criteria
- [ ] Save files are correctly formatted and placed in `tests/fixtures/`.
- [ ] A manifest or README is updated/created to describe the state and purpose of each new fixture.
- [ ] Japanese Crystal save is either successfully parsed or replaced.
