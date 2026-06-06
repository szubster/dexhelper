---
id: prd-068-037-unown-tracker
type: PRD
title: Unown Form Tracker PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-01'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-068-unown-tracker
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Unown Form Tracker PRD

## Overview
This PRD defines the requirements for implementing the Unown Form Tracker, based on the `idea-068-unown-tracker` node. The feature aims to parse and track the distinct letter forms of Unown in Gen 2 games, turning a hidden DV calculation into an actionable checklist for hardcore collectors.

## Proposed Epics Breakdown

To ensure granular execution and minimize complexity, this PRD should be broken down into the following Epics by the `epic_planner`:

### Epic 1: Engine / Parsing Updates
**Objective**: Enhance the Gen 2 save parser to correctly identify and expose Unown forms.
- **Logic**: For Unown (`speciesId` 201) in Gen 2, determine the form by extracting the middle 2 bits of the Attack, Defense, Speed, and Special DVs. Combine them into an 8-bit integer and calculate modulo 28. (0-25 correspond to forms A-Z).
- **Output**: The parser must append an `unownForm` property (e.g., `'A'`, `'B'`) to the parsed Pokemon instance structure so it can be consumed by the UI.
- **Testing**: Requires unit tests verifying the exact bitwise calculation against known DV combinations for Unown forms.

### Epic 2: UI / Storage Viewer Updates
**Objective**: Surface the parsed Unown forms in the user interface to provide a checklist.
- **Logic**: Add a dedicated "Unown Dex" panel or filter within the existing Storage Viewer.
- **Display**: It should visually represent which of the 26 Gen 2 forms are currently owned by the player (in Party or PC) and which are missing.
- **Design Constraints**: Must adhere strictly to the "tactical hardware/snooping" aesthetic (`rounded-none`, dashed borders, monospace fonts) as defined in ADR 008.

## Acceptance Criteria
- [x] Epic 1 (Engine Updates) node created. (.foundry/epics/epic-037-058-unown-tracker-engine.md)
- [x] Epic 2 (UI Updates) node created. (.foundry/epics/epic-037-059-unown-tracker-ui.md)
