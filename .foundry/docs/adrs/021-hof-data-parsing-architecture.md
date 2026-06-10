---
id: adr-044-021-hof-data-parsing-architecture
type: ADR
title: Hall of Fame Data Parsing Architecture
status: PENDING
owner_persona: architect
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-070-044-hall-of-fame-exporter
tags:
  - architecture
  - hall-of-fame
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 021: Hall of Fame Data Parsing Architecture

## Context
We need to extract Hall of Fame records from Gen 1 and Gen 2 save files to build a social sharing utility. Gen 2 has a specific requirement involving a 0xA8 offset from Johto badges.

## Decision
We will extend the existing save parsing engine to include specific logic for Gen 1 and Gen 2 Hall of Fame data blocks. The parser must gracefully handle the 0xA8 offset for Gen 2.

## Acceptance Criteria
- [ ] Detail the parsing logic and offsets for Gen 1 and Gen 2.
