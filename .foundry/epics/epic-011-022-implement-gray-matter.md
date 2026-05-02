---
id: epic-011-022-implement-gray-matter
type: EPIC
title: "Epic: Implement Gray-Matter parsing system-wide"
status: READY
owner_persona: "epic_planner"
created_at: "2026-05-02"
updated_at: "2026-05-02"
depends_on:
  - .foundry/prds/prd-012-011-gray-matter-parsing.md
jules_session_id: null
parent: ".foundry/prds/prd-012-011-gray-matter-parsing.md"
tags: ["foundry", "parsing", "gray-matter", "maintenance"]
notes: "Derived from PRD prd-012-011-gray-matter-parsing. Enforces ADR-006."
---

# Epic: Implement Gray-Matter parsing system-wide

## Objective
Standardize the parsing and serialization of Foundry nodes using `gray-matter` to replace the fragile regex-based custom parsers.

## Acceptance Criteria
- [x] `foundry-orchestrator.ts` uses `gray-matter` stringification for status promotions.
- [x] `foundry-active.ts` uses `gray-matter` stringification for active transitions.
- [x] Strict "dumb" diff checks that break due to formatting changes are removed or updated to compare the parsed data objects instead of raw string lengths.
- [x] All tests pass.
