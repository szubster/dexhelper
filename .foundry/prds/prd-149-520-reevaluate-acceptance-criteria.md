---
id: prd-149-520-reevaluate-acceptance-criteria
type: PRD
title: Re-evaluate Acceptance Criteria Structure and Usage in Foundry
status: PENDING
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-149-reevaluate-acceptance-criteria
tags:
  - foundry
  - architecture
  - schema
  - acceptance-criteria
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Re-evaluate Acceptance Criteria Structure and Usage in Foundry

## Context & Problem Statement
Acceptance Criteria in the Foundry workflow are currently specified as freeform Markdown task checkboxes (`- [ ]`) in the body of node files (IDEAs, PRDs, EPICs, STORYs, TASKs). They serve multiple purposes:
1. Defining completion conditions for human/agent review.
2. Tracking child node generation for macro parent nodes (e.g., `- [ ] prd-xxx-yyy.md`).
3. Acting as signals for the Orchestrator and Heartbeat to enforce task completion before PR merge (ADR 007 / ADR 009).

However, mixing business/technical completion criteria, child node tracking, and orchestrator state signals into unformatted Markdown body checkboxes introduces friction and ambiguities. We need to formalize this process to reduce friction and eliminate false-positive Empty PR merges.

## Product Requirements
This PRD mandates a comprehensive evaluation of Acceptance Criteria across the Foundry architecture.

### 1. Research Phase
- Create a `RESEARCH` node to audit current usage of Acceptance Criteria across all node types.
- Analyze failure modes, such as premature verification, false-positive empty PR merges, and parsing ambiguities.
- Evaluate alternatives for structuring acceptance criteria (YAML frontmatter, dedicated markdown sections, or omitting them for certain nodes).

### 2. Architecture Decision Phase
- Create an `ADR` node to document the agreed-upon standards for Acceptance Criteria structure, schema location, child node listing conventions, and orchestrator parsing rules.
- Define necessary updates for `.foundry/docs/schema.md` and `.github/scripts/foundry-orchestrator.ts`.

## Acceptance Criteria
- [x] epic_planner: Break down this PRD into EPIC(s) focusing on the research and ADR phases.
- [ ] epic-520-534-acceptance-criteria-research
- [ ] epic-520-535-acceptance-criteria-adr
