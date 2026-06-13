---
id: task-098-172-locate-mirage-island-offset-retry
type: TASK
title: Locate Mirage Island Data Block Offset (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - research-098-171-investigate-mirage-island-offset
jules_session_id: null
pr_number: null
parent: story-061-098-locate-mirage-island-data
tags:
  - gen3
  - mirage-island
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Locate Mirage Island Data Block Offset (Retry)

## Context
As part of the Mirage Island save parsing feature (Story `story-061-098-locate-mirage-island-data`), we need to identify the precise byte offset, section, and data structure for the random/daily variables block that contains the 2-byte Mirage Island value in Gen 3 save files (Ruby, Sapphire, Emerald). A previous attempt failed QA because the documented section was incorrect according to Bulbapedia.

## Requirements
1. Review the findings in `research-098-171-investigate-mirage-island-offset.md`.
2. Determine the exact offset for the Mirage Island daily value within the Generation 3 save data structure based on the research.
3. Determine the size and format of this data.
4. Document these findings in a new file `.foundry/docs/knowledge_base/gen3_mirage_island_offsets.md`. Ensure you map the byte offsets to the correct logical 4KB section boundaries (e.g. "Section 2 - Game State").

## Tech Lead Instructions for Coder
- **Documentation format**: Provide the offsets, sections, and data sizes clearly in the new markdown file.
- **Reminder**: Even if no application source code is changed and you only add the documentation file, you MUST use the `submit` tool to create the Pull Request. Do not leave the PR empty without updating the Acceptance Criteria checkboxes (`- [x]`) if you make an empty PR.
- **Failure Condition**: If you cannot locate the offset or encounter permanent failures, you MUST update this node's YAML frontmatter to `status: FAILED` with a clear `rejection_reason`.

## Acceptance Criteria
- [ ] Document the exact byte offset(s) for the Mirage Island value in R/S/E.
- [ ] Document the correct section containing the value.
- [ ] Document the data structure size (expected to be a 16-bit integer).
- [ ] Create or update `.foundry/docs/knowledge_base/gen3_mirage_island_offsets.md` with the findings.
