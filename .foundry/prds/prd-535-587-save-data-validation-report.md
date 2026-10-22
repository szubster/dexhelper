---
id: prd-535-587-save-data-validation-report
type: PRD
title: Save File Corruption & Data Structure Integrity Diagnostic Report
status: READY
owner_persona: epic_planner
created_at: "2026-10-16T18:14:49.553Z"
updated_at: "2026-10-16"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-535-save-data-validation-report
tags:
  - save-parser
  - diagnostics
  - dx
  - ui
locks: []
confidence_score: 90
---

# Save File Corruption & Data Structure Integrity Diagnostic Report

## Product Requirements Document

### 1. Goal & Vision
DexHelper's save file parsing currently uses a brittle, all-or-nothing approach. A minor corruption in an inconsequential block (e.g., Secret Bases) can cause the entire `.sav` parser to throw an error (such as a generic `RangeError` or checksum failure), entirely preventing the user from viewing their intact primary data (party, PC boxes). This opaqueness also causes high friction for developers who must resort to ad-hoc logging to debug offset mismatches.

The vision is to transform the parser into a resilient, fault-tolerant engine that gracefully handles partial corruption. By decoupling a `SaveDataValidationReport` subsystem, the app will capture specific byte-range block health statuses (`VALID`, `CORRUPTED`, `OOB_TRUNCATED`, `CHECKSUM_MISMATCH`), isolate non-fatal failures, and partially hydrate the save state. A tactical diagnostic UI modal will then surface these detailed block-by-block health reports to both users and developers.

### 2. Scope & Requirements

#### 2.1 Core Subsystem (`src/engine/saveParser/validation/`)
- Define TypeScript data structures for a diagnostic report representing the health of individual save blocks (Header, Trainer Info, Team/Party, PC Boxes, Pokedex, Flags, Berry Trees).
- Implement a collector utility to track the status (`VALID`, `CORRUPTED`, `OOB_TRUNCATED`, `CHECKSUM_MISMATCH`) and byte range metadata of each section.

#### 2.2 Graceful Parsing Architecture
- Integrate the diagnostic utility into Gen 1, Gen 2, and Gen 3 parsers.
- Replace fail-fast exceptions with try-catch block isolation. If a non-critical block fails, the parser must record a localized diagnostic error while continuing to extract other intact structures (e.g., preserving PC boxes even if the Berry Tree block is corrupt).
- The parsing pipeline must return the partial hydrated save state alongside the completed diagnostic report.

#### 2.3 Diagnostic UI Modal
- Implement a `SaveDiagnosticModal` using the established hardware design system (`tactical-panel`, `TacticalBadge`, `font-mono`, etc.).
- Expose a "Diagnostics & Health Report" trigger in the save file header/settings toolbar.
- The modal must clearly render a tactical breakdown of block-by-block health, checksum comparison values, and memory offset boundaries.

#### 2.4 Testing Strategy
- Unit test the `SaveValidationReport` collector for accurately logging valid and corrupted states.
- Introduce integration tests parsing synthetic/corrupted `.sav` fixtures to verify that partial hydration succeeds and proper error statuses are appended to the report.
- Create component tests verifying the UI modal correctly renders various health statuses without runtime errors.

### 3. Acceptance Criteria
- [ ] Break down into Epics
