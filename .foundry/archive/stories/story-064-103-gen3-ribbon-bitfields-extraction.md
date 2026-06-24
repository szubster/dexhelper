---
id: story-064-103-gen3-ribbon-bitfields-extraction
type: STORY
title: Gen 3 Ribbon Bitfields Extraction
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

# STORY: Gen 3 Ribbon Bitfields Extraction

## 1. Context
As derived from `epic-040-064-gen3-contest-data-extraction`, DexHelper requires the ability to extract hidden contest-related statistics and ribbons directly from Gen 3 save files.

This Story focuses specifically on navigating the blocks and offsets to locate and parse the bitfields representing Contest Ribbons.

## 2. Requirements
- Implement logic to locate the correct block and offsets for the ribbon bitfields in Gen 3 saves.
- Extract the bitfields and expose the data structure.
- **Strict DataView API Usage**: All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint32`) as mandated by ADR 010.

## 3. Acceptance Criteria
- [x] Write tasks to update the Gen 3 parsing engine to extract the Ribbon bitfields using the `DataView` API.
- [ ] .foundry/archive/tasks/task-103-157-gen3-ribbon-bitfields-impl.md
- [ ] .foundry/archive/tasks/task-103-158-gen3-ribbon-bitfields-qa.md
- [x] Ensure unit tests are planned to verify the exact extracted bitfields are accurate.
