---
id: task-436-456-parser-integration-impl
type: TASK
title: Integrate Mapped Blocks with Gen3 Parsers
status: FAILED
owner_persona: coder
created_at: '2026-08-21'
updated_at: '2026-08-23'
depends_on:
  - task-436-454-state-variables-extraction-impl
jules_session_id: null
pr_number: null
parent: story-424-436-save-block-mapping
tags:
  - emulator
  - memory
  - parsing
research_references: []
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session timed out (>24h)'
notes: ''
---

# Integrate Mapped Blocks with Gen3 Parsers

## Objective
Integrate the live memory mappings with existing standard Gen3 save block parsers.

## Description
Develop the logic to route the continuous memory blocks and extracted state variables into the existing standard save block parsing architecture. As mandated by `.foundry/archive/docs/adrs/010-gen3-data-parsing.md`, you must maintain legacy interface compatibility (e.g. Gen 1 and Gen 2). Do not alter or break backward compatibility of the legacy parsing interfaces while adding Gen3 routing. Ensure unit tests are comprehensive and pass.

## Acceptance Criteria
- [ ] Routed mapped blocks through existing Gen3 parsers
- [ ] Maintained legacy interface compatibility
