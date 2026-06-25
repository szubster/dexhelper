---
id: story-064-102-gen3-sheen-value-parsing
type: STORY
title: Gen 3 Sheen Value Parsing
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-040-064-gen3-contest-data-extraction
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Gen 3 Sheen Value Parsing

## 1. Context
As derived from `epic-040-064-gen3-contest-data-extraction`, DexHelper requires the ability to extract hidden contest-related statistics and ribbons directly from Gen 3 save files.

This Story focuses specifically on the extraction logic for the Pokémon's Sheen value.

## 2. Requirements
- Implement logic to locate the correct block and offset for the Sheen value in Gen 3 saves.
- Extract the Sheen value.
- **Strict DataView API Usage**: All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint8`) as mandated by ADR 010.

## 3. Acceptance Criteria
- [x] Write tasks to update the Gen 3 parsing engine to extract the Sheen value using the `DataView` API.
- [x] Ensure unit tests are planned to verify the exact extracted Sheen value.


## Tasks
- [ ] .foundry/tasks/task-102-157-impl-gen3-sheen-parsing.md
- [ ] .foundry/tasks/task-102-158-qa-gen3-sheen-parsing.md
