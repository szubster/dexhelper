---
id: adr-044-021-hof-data-parsing-architecture
type: ADR
title: Hall of Fame Data Parsing Architecture
status: ACTIVE
owner_persona: architect
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '11486473911253049733'
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

### Parsing Logic and Offsets

**Generation 1:**
- The Hall of Fame count is located at the base offset `0x25B3`.
- An `offsetShift` must be added to this base offset. The `offsetShift` is `1` for the Yellow version and `0` for Red/Blue versions.
- The value at `0x25B3 + offsetShift` is a single 8-bit unsigned integer. Note that a raw value of `0xFF` should be interpreted as `0`.

**Generation 2:**
- The Hall of Fame count is determined using a relative offset, specifically `0xA8` (168) bytes after the `johtoBadgesOffset`.
- The `johtoBadgesOffset` is `0x23E5` for Crystal and `0x23E4` for Gold/Silver.
- The exact offset for the Hall of Fame count is therefore calculated as `johtoBadgesOffset + 0xA8`.

## Acceptance Criteria
- [x] Detail the parsing logic and offsets for Gen 1 and Gen 2.
