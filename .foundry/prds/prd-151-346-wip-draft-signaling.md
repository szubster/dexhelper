---
id: prd-151-346-wip-draft-signaling
type: PRD
title: Work-in-Progress and Draft Artifact Signaling
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-31'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '18349447856418113021'
pr_number: null
parent: idea-151-work-in-progress-draft-signaling
tags:
  - foundry
  - dexhelper
  - adr
  - architecture
  - documentation
  - wip
research_references: []
rejection_reason: ''
---

# PRD: Work-in-Progress and Draft Artifact Signaling across Foundry and DexHelper

## 1. Context & Problem Statement
When early-stage features or architectural changes are introduced in Foundry or DexHelper, various supporting artifacts are created (e.g., ADRs, Research documents, early experimental feature code). These artifacts are often incomplete drafts or preliminary designs, and their underlying implementations may not exist or might undergo radical changes.

Currently, there is no standardized mechanism to communicate a "Work-In-Progress (WIP)" or "Draft" status. This leads to downstream tasks and future agent sessions prematurely depending on unstable specifications and code, causing broken assumptions, technical debt, and circular rework.

## 2. Objectives
Establish a formal signaling mechanism and promotion workflow to explicitly mark, track, and promote draft/WIP artifacts across Foundry and DexHelper.

## 3. Requirements

### 3.1 Documentation & Markdown Artifacts
- **Frontmatter Updates:** Introduce an explicit `status: DRAFT` or `status: WIP` field in the frontmatter of ADRs, research notes, and documentation nodes.
- **Visual Signaling:** Enforce a standardized Markdown banner (`> ⚠️ **WORK IN PROGRESS / DRAFT**`) at the top of these artifacts.
- **Scope:** Applies to any Foundry documentation node that is non-final and represents a preliminary design.

### 3.2 Code & Implementation Signaling
- **Feature Flags / Namespaces:** Enforce WIP code guards in DexHelper and Foundry.
  - Experimental code must be placed behind explicit feature flags.
  - Alternatively, code should be placed in explicitly marked namespaces (e.g., `src/experimental/` or `src/draft/`).

### 3.3 Artifact Promotion Workflow
- **Promotion Mechanics:** Define automated or procedural mechanisms to promote WIP/draft artifacts to `STABLE` / `ACTIVE` when the overarching idea/feature is fully merged and released.
  - This involves removing the `> ⚠️ **WORK IN PROGRESS / DRAFT**` banners.
  - Updating frontmatter `status` from `DRAFT` to `STABLE` or removing the `DRAFT` designation.
  - Graduating code out of `experimental/` namespaces or removing feature flags.

### 3.4 Orchestrator & Agent Awareness
- **Context/Prompt Updates:** Update persona prompts (e.g., in `.github/agents/*.md`) and orchestrator rules to explicitly recognize draft ADRs and WIP code.
- Agents must be instructed to **not** take downstream dependencies on artifacts marked as `DRAFT` or `WIP` until they are formally promoted.

## 4. Acceptance Criteria
- [ ] epic-346-517-wip-documentation
- [ ] epic-346-518-wip-code-signaling
- [ ] epic-346-519-wip-artifact-promotion
- [ ] epic-346-520-wip-orchestrator-awareness
