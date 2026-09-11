---
id: story-534-536-propose-acceptance-criteria-alternatives
type: STORY
title: Propose Acceptance Criteria Alternatives
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-04'
updated_at: '2026-09-08'
depends_on:
  - research-534-517-audit-acceptance-criteria
jules_session_id: '2516269691498682845'
pr_number: null
parent: epic-520-534-acceptance-criteria-research
tags:
  - foundry
  - architecture
research_references:
  - .foundry/research/research-534-517-audit-acceptance-criteria.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Propose Acceptance Criteria Alternatives

## Context & Problem Statement
Currently, Acceptance Criteria in Foundry are implemented as freeform Markdown task checkboxes. This leads to friction, premature verification, and false-positive empty PR merges. Based on the audit and evaluation in the research phase, we need to propose concrete alternative implementations.

## Story Requirements
- Review the findings from the research phase regarding the failure modes and alternative evaluations.
- Select the best alternative for structuring acceptance criteria.
- Create an ADR or update `schema.md` to document the new architecture.

## Acceptance Criteria
- [ ] tech_lead: Break down this Story into TASK nodes to implement the new architecture.
