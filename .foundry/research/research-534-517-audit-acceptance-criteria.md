---
id: research-534-517-audit-acceptance-criteria
type: RESEARCH
title: Audit Acceptance Criteria Usage
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '1065969208029131205'
locks: []
pr_number: null
parent: epic-520-534-acceptance-criteria-research
tags:
  - foundry
  - architecture
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Audit Acceptance Criteria Usage

## Context & Problem Statement
Currently, Acceptance Criteria in Foundry are implemented as freeform Markdown task checkboxes. This leads to friction, premature verification, and false-positive empty PR merges.

## Research Requirements
- Audit the current usage of Acceptance Criteria across all Foundry node types.
- Analyze failure modes (e.g., premature verification, false-positive empty PR merges, parsing ambiguities).
- Evaluate alternatives for structuring acceptance criteria, such as YAML frontmatter, dedicated markdown sections, or omitting them for certain nodes.

## Acceptance Criteria
- [ ] researcher: Complete the audit of the current usage of Acceptance Criteria across all Foundry node types.
- [ ] researcher: Complete the analysis of failure modes.
- [ ] researcher: Complete the evaluation of alternatives for structuring acceptance criteria.
