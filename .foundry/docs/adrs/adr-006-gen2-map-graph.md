---
id: adr-006-gen2-map-graph
type: ADR
title: "ADR: Gen 2 Map Graph Architecture"
status: COMPLETED
owner_persona: architect
created_at: "2026-05-04"
updated_at: "2026-05-04"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-006-gen2-expansion.md
tags: ["gen2", "architecture"]
---

# ADR: Gen 2 Map Graph Architecture

## Context
Gen 2 introduces a dual-region layout (Johto and Kanto), requiring a robust graph routing system to navigate cross-regionally effectively.

## Decision
We will implement a unified bidirectional graph map structure that seamlessly supports cross-region paths through defined interconnects (like S.S. Aqua, Magnet Train, and Routes 26/27).

## Consequences
- Requires adapting existing graphing logic to incorporate cross-region transitions correctly.
