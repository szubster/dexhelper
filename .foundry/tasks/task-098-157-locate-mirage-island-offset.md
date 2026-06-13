---
id: task-098-157-locate-mirage-island-offset
type: TASK
title: Locate Mirage Island Data Block Offset
status: READY
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-098-locate-mirage-island-data
tags:
  - gen3
  - mirage-island
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Locate Mirage Island Data Block Offset

## Context
As part of the Mirage Island save parsing feature (Story `story-061-098-locate-mirage-island-data`), we need to identify the precise byte offset and data structure for the random/daily variables block that contains the 2-byte Mirage Island value in Gen 3 save files (Ruby, Sapphire, Emerald).

## Requirements
1. Identify the exact offset for the Mirage Island daily value within the Generation 3 save data structure.
2. Determine the size and format of this data.
3. Document these findings in a new file `.foundry/docs/knowledge_base/gen3_mirage_island_offsets.md`.

## Tech Lead Instructions for Coder
- **Documentation format**: Provide the offsets and data sizes clearly in the new markdown file.
- **Reminder**: Even if no application source code is changed and you only add the documentation file, you MUST use the `submit` tool to create the Pull Request. Do not leave the PR empty without updating the Acceptance Criteria checkboxes (`- [x]`) if you make an empty PR.
- **Failure Condition**: If you cannot locate the offset or encounter permanent failures, you MUST update this node's YAML frontmatter to `status: FAILED` with a clear `rejection_reason`.

## Acceptance Criteria
- [ ] Document the exact byte offset(s) for the Mirage Island value in R/S/E.
- [ ] Document the data structure size (expected to be a 16-bit integer).
- [ ] Create `.foundry/docs/knowledge_base/gen3_mirage_island_offsets.md` with the findings.
