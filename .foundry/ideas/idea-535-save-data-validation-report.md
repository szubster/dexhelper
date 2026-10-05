---
id: "idea-535-save-data-validation-report"
type: "IDEA"
title: "Save File Corruption & Data Structure Integrity Diagnostic Report"
status: "PENDING"
owner_persona: "product_manager"
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 90
tags:
  - "save-parser"
  - "diagnostics"
  - "dx"
  - "ui"
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Save File Corruption & Data Structure Integrity Diagnostic Report

## Executive Summary
When importing corrupted, incomplete, or modified Pokemon save files (`.sav`), DexHelper currently catches out-of-bounds reads (`RangeError`) or invalid checksums at the parser level and throws generic errors. While this prevents application crashes, users and developers lack insight into *where* or *why* a save file failed parsing (e.g., checksum mismatch in Block 1 vs Block 2, corrupted party struct, truncated PC boxes, or invalid bitwise flags).

This proposal introduces a structured, non-fatal **Save File Data Integrity & Diagnostic Reporting Subsystem** in `src/engine/saveParser/` that generates a detailed integrity report upon save file load.

## Problem Statement
1. **Opaque Error Messages**: When `RangeError` or checksum failures occur during save parsing, users receive a generic failure banner ("The save file is corrupted or incomplete"), giving no actionable context on whether the save is recoverable or which specific sections are invalid.
2. **Developer Debugging Friction**: Developers testing new save file parsers or edge-case `.sav` dumps must manually attach debuggers or add `console.log` statements to identify offset mismatches or bitwise parsing anomalies.
3. **Partial Data Recovery**: Currently, if one non-critical section (e.g., Secret Bases or Hall of Fame entries) has minor byte corruption, the entire save parsing pipeline halts, preventing the user from viewing valid party/PC Pokemon or inventory data.

## Proposed Solution
Introduce a decoupled `SaveDataValidationReport` engine and tactical UI modal:
1. **Diagnostic Validation Suite**:
   - Extend save parsers (Gen 1-3) to collect validation diagnostics across individual blocks/sections (Header, Trainer Info, Team/Party, PC Boxes, Pokedex, Flags, Berry Trees) during extraction.
   - Record block status (`VALID`, `CORRUPTED`, `OOB_TRUNCATED`, `CHECKSUM_MISMATCH`) and byte range details.
2. **Graceful Partial Hydration**:
   - Allow parsers to safely isolate non-fatal section failures, logging a diagnostic entry while continuing to extract intact core data structures (e.g., Party and PC Boxes).
3. **Tactical Integrity UI Modal**:
   - Provide a "Diagnostics & Health Report" button in the save file header/settings toolbar.
   - Render a tactical breakdown displaying block-by-block health, checksum comparison values, and memory offset boundaries using the existing hardware design system (`tactical-panel`, `TacticalBadge`).

## Acceptance Criteria
- [ ] Implement `SaveValidationReport` data structures and collector utility in `src/engine/saveParser/validation/`.
- [ ] Integrate block-level validation checks (checksums, section size limits, offset range checks) into Gen 1, Gen 2, and Gen 3 parsers.
- [ ] Implement a reusable UI diagnostic modal component (`SaveDiagnosticModal`) rendering section health statuses.
- [ ] Ensure non-fatal block corruption yields partial save state hydration with user warnings rather than complete parsing failure.
- [ ] Add unit and component tests verifying diagnostic report generation for both valid and synthetic corrupted `.sav` files.
