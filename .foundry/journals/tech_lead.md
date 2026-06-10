---
id: adr-102-024-gen3-sheen-dataview-strict
type: ADR
title: Gen 3 Sheen DataView Strict Adherence
status: COMPLETED
owner_persona: tech_lead
created_at: 2026-06-10
updated_at: 2026-06-10
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - architecture
  - gen3
  - dataview
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# ADR 024: Gen 3 Sheen DataView Strict Adherence

## Status
Accepted

## Context
When implementing Gen 3 Sheen value parsing, we must strictly adhere to ADR 010.

## Decision
All new Gen 3 Sheen data parsing logic MUST exclusively use the native `DataView` API.

## Consequences
Prevents silent failures and ensures backwards compatibility.
