---
id: story-064-101-gen3-condition-stats-parsing
type: STORY
title: Gen 3 Condition Stats Parsing
status: READY
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

# STORY: Gen 3 Condition Stats Parsing

## 1. Context
As derived from `epic-040-064-gen3-contest-data-extraction`, DexHelper requires the ability to extract hidden contest-related statistics and ribbons directly from Gen 3 save files.

This Story focuses on parsing the Condition stats (Cool, Beauty, Cute, Smart, Tough) for each Pokémon.

## 2. Requirements
- Implement logic to locate the correct block and offset for Condition stats in Gen 3 saves.
- Extract Cool, Beauty, Cute, Smart, and Tough values.
- **Strict DataView API Usage**: All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint8`) as mandated by ADR 010.

## 3. Acceptance Criteria
- [ ] Write tasks to update the Gen 3 parsing engine to extract Condition stats using the `DataView` API.
- [ ] Ensure unit tests are planned to verify the exact extracted condition values for each stat.
