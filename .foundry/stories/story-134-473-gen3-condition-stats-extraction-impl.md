---
id: story-134-473-gen3-condition-stats-extraction-impl
type: STORY
title: Implement Gen 3 Contest Condition Data Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '8762556071915033310'
pr_number: null
parent: epic-101-134-gen3-condition-stats-extraction
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Contest Condition Data Extraction

## Objective
Implement parsing logic for Contest stats (Coolness, Beauty, Cuteness, Smartness, Toughness, Feel) located in the EVs & Condition (E) substructure of the Gen 3 save format.

## Technical Context
- See `.foundry/docs/knowledge_base/engine/save_parsing/gen3_condition_stats_offsets.md` for offsets and decryption logic.

## Acceptance Criteria
- [x] Break down story into tasks for implementing Condition data extraction logic.
- [ ] task-473-493-gen3-condition-stats-constants
- [ ] task-473-494-gen3-condition-stats-parser
- [ ] task-473-495-gen3-condition-stats-qa
