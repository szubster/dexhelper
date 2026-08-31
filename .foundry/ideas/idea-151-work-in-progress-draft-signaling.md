---
id: idea-151-work-in-progress-draft-signaling
type: IDEA
title: Work-in-Progress and Draft Artifact Signaling across Foundry and DexHelper
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-15'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '14058412022067600461'
pr_number: null
parent: null
tags:
  - foundry
  - dexhelper
  - adr
  - architecture
  - documentation
  - wip
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Work-in-Progress and Draft Artifact Signaling across Foundry and DexHelper

## Context & Problem Statement
When early-stage features or architectural changes are introduced in Foundry or DexHelper (for example, recent work on introducing experiment nodes or early-stage ADRs), various supporting artifacts are created:
- Architecture Decision Records (ADRs)
- Research documents & Knowledge Base entries
- Early feature code or experimental APIs in DexHelper / Foundry

These artifacts are written as they are needed during early exploration, but they are often incomplete drafts or preliminary designs. The underlying implementation code may not exist yet, or the APIs may undergo radical changes before the overarching feature/idea is finalized.

Currently, there is no standardized, explicit mechanism to communicate "Work-In-Progress / Draft / Unreleased" status for these artifacts. As a result, other parts of Foundry, DexHelper, or future agent sessions may prematurely depend on or build upon these unfinished, unstable specifications and code, leading to broken assumptions, technical debt, and circular rework.

## Proposed Idea
Establish a formal signaling mechanism and promotion workflow across Foundry and DexHelper to explicitly mark, track, and promote draft or work-in-progress artifacts:
1. **Frontmatter & Header Metadata for Docs/ADRs:** Introduce an explicit `status: DRAFT` or `status: WIP` field and a standardized `> ⚠️ **WORK IN PROGRESS / DRAFT**` banner in ADRs, research notes, and documentation nodes until their parent feature/idea is fully merged and released.
2. **Feature Flags & Experimental Namespaces in Code:** Enforce WIP code guards in DexHelper and Foundry (e.g., placing experimental code behind feature flags or inside explicitly marked `experimental/` or `draft/` namespaces).
3. **Artifact Promotion Workflow:** Define an explicit mechanism and rules for promoting WIP/draft artifacts to `ACTIVE` / `STABLE` once the full idea/feature implementation completes (e.g., automated orchestrator promotion tasks or lifecycle triggers that strip draft banners and graduate experimental code namespaces to stable status upon parent completion).
4. **Orchestrator & Agent Awareness:** Update persona prompts and orchestrator rules so that agents recognize draft ADRs and WIP code as non-final, preventing downstream tasks from taking dependencies on them until they are formally promoted to `ACTIVE` / `STABLE`.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate work on WIP/Draft artifact signaling and promotion for Foundry and DexHelper.
- [ ] Product Manager: Convert this IDEA into a PRD detailing schema updates, documentation standards, code feature flag rules, and promotion workflows for WIP artifacts.
