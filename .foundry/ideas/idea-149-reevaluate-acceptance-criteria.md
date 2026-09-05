---
id: idea-149-reevaluate-acceptance-criteria
type: IDEA
title: Re-evaluate Acceptance Criteria Structure and Usage in Foundry
status: READY
owner_persona: product_manager
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

# Idea: Re-evaluate Acceptance Criteria Structure and Usage in Foundry

## Context & Problem Statement
Acceptance Criteria in the Foundry workflow are currently specified as freeform Markdown task checkboxes (`- [ ]`) in the body of node files (IDEAs, PRDs, EPICs, STORYs, TASKs). They serve multiple purposes:
1. Defining completion conditions for human/agent review.
2. Tracking child node generation for macro parent nodes (e.g., `- [ ] prd-xxx-yyy.md`).
3. Acting as signals for the Orchestrator and Heartbeat to enforce task completion before PR merge (ADR 007 / ADR 009).

However, mixing business/technical completion criteria, child node tracking, and orchestrator state signals into unformatted Markdown body checkboxes introduces friction and ambiguities:
- **Redundancy & Friction**: Are explicit Acceptance Criteria sections actually necessary or valuable for every node type (e.g. raw IDEAs or atomic TASKs), or do they add boilerplate?
- **Schema Placement**: Should Acceptance Criteria be formalized in the YAML frontmatter schema (e.g., as structured strings or arrays) rather than parsed from loose Markdown body text?
- **Child Task Separation**: Should child/descendant nodes be listed under "Acceptance Criteria", or should they be separated into a dedicated "Downstream Graph Nodes" / "Child Nodes" section or managed strictly via frontmatter fields (`parent` / `depends_on`)?
- **Orchestrator Enforcement**: How do parent node vs leaf task acceptance criteria interact with late-binding awakenings, empty PRs, and completion verification?

## Proposed Scope & Research Mandate
This idea initiates a comprehensive evaluation of Acceptance Criteria across the Foundry architecture. As part of downstream processing, this initiative MUST execute a research and ADR process:

### 1. Research Phase (`RESEARCH` node)
- Audit current usage of Acceptance Criteria across all `.foundry/` node types (`IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`).
- Analyze failure modes, such as premature verification, false-positive empty PR merges, and parsing ambiguities.
- Evaluate alternatives for structuring acceptance criteria:
  - Alternative A: Formalizing `acceptance_criteria` in YAML frontmatter schema.
  - Alternative B: Separating functional acceptance criteria from child node tracking lists.
  - Alternative C: Omitting acceptance criteria on certain macro or micro nodes where DAG dependencies alone suffice.

### 2. Architecture Decision Record Phase (`ADR` node)
- Formulate an ADR documenting the agreed-upon standards for Acceptance Criteria structure, schema location, child node listing conventions, and orchestrator parsing rules.
- Define updates required for `.foundry/docs/schema.md` and `.github/scripts/foundry-orchestrator.ts`.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate research and ADR re-evaluation for Foundry Acceptance Criteria.
- [ ] Product Manager: Convert this IDEA into a PRD mandating research and ADR creation.
