---
id: research-108-209-gen3-roamer-iv-bitfield
type: RESEARCH
title: "Gen 3 Roamer IV Bitfield Layout"
status: PENDING
owner_persona: "researcher"
created_at: "2026-06-19"
updated_at: "2026-06-19"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer IV Bitfield Layout

## Context

Investigate the bitwise layout for parsing Gen 3 Roamer IVs, HP, and Level from the extracted 20-byte DataView structure. Document the bit offsets and masks.

## Objective

Identify the exact bit lengths and offsets used for the 6 IV values, current HP, and Level inside the 20-byte roamer structure. Provide reference constants and mapping code to parse them out via `DataView`. Ensure findings align with `ADR 026: Bitwise State Extraction and Cured Boundaries`.
