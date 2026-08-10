---
id: research-358-406-gen3-trainer-card-offsets
type: RESEARCH
title: Research - Gen 3 Trainer Card Contest Master Rank Offsets
status: FAILED
owner_persona: researcher
created_at: '2026-08-09'
updated_at: '2026-08-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-400-358-gen3-trainer-card-parsing-core
tags:
  - research
  - gen3
  - completionist
research_references: []
rejection_count: 0
rejection_reason: Circular dependency detected
notes: ''
---

# Research: Gen 3 Trainer Card Contest Master Rank Offsets

## Objective
Investigate the specific memory offsets and logic required to parse the "Contest Master Rank" requirement for the Gen 3 Trainer Card upgrade. The documentation currently details how individual Pokemon ribbons are stored (`gen3_pokemon_data_structure.md`), but it is unclear if the Trainer Card star is awarded via a global flag (such as the Lilycove Museum painting flags) or if it requires scanning PC boxes for specific ribbons.

## Acceptance Criteria
- [ ] Document the memory offsets and bitwise flags representing the Contest Master Rank criteria for the Gen 3 Trainer Card.
- [ ] Create an ADR or update the Knowledge Base (`.foundry/docs/knowledge_base/`) with the findings.
