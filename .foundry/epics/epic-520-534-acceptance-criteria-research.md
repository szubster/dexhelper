---
id: epic-520-534-acceptance-criteria-research
type: EPIC
title: 'Research Phase: Acceptance Criteria Usage'
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '17641458150879217254'
locks: []
pr_number: null
parent: prd-149-520-reevaluate-acceptance-criteria
tags:
  - foundry
  - architecture
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Research Phase: Acceptance Criteria Usage

## Context & Problem Statement
Currently, Acceptance Criteria in Foundry are implemented as freeform Markdown task checkboxes. This leads to friction, premature verification, and false-positive empty PR merges. A comprehensive audit and evaluation of the current usage is needed.

## Epic Requirements
- Audit the current usage of Acceptance Criteria across all Foundry node types.
- Analyze failure modes (e.g., premature verification, false-positive empty PR merges, parsing ambiguities).
- Evaluate alternatives for structuring acceptance criteria, such as YAML frontmatter, dedicated markdown sections, or omitting them for certain nodes.
- Generate a `RESEARCH` node to carry out this audit and evaluation.

## Acceptance Criteria
- [x] story_owner: Break down this Epic into STORY nodes, including the creation of the required `RESEARCH` node.
- [x] story_owner: Ensure this Epic generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] research-534-517-audit-acceptance-criteria
- [ ] story-534-536-propose-acceptance-criteria-alternatives
- [ ] story-534-537-acceptance-criteria-integration-e2e
