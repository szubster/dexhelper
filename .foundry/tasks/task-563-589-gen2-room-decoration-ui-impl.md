---
id: task-563-589-gen2-room-decoration-ui-impl
type: TASK
title: Gen 2 Room Decoration UI Components Implementation
status: READY
owner_persona: coder
created_at: '2026-09-17T15:30:11Z'
updated_at: '2026-09-17T15:30:11Z'
depends_on: []
parent: story-313-563-gen2-room-decoration-ui-components
locks: []
jules_session_id: null
rejection_reason: ''
---

# Task: Gen 2 Room Decoration UI Components Implementation

## Context
As part of `story-313-563-gen2-room-decoration-ui-components`, we need to implement the presentation components for the Gen 2 Room Decoration Viewer. This task focuses on the core React UI component logic.

## Requirements
- Implement a React component (e.g., `Gen2RoomDecorationDashboard`) that displays unlocked room decorations.
- The UI must group and display decorations into distinct categories: Beds, Plants, Posters, Consoles, Ornaments, Dolls.
- Implement a clear visual indicator for Mystery Gift exclusive decorations (e.g., a specific tactical badge, border style, or icon).
- Ensure strict adherence to ADR 008 (Tactical Hardware aesthetics), including sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced typography.

## Acceptance Criteria
- [ ] React components for the layout and categorized display are implemented.
- [ ] Mystery Gift exclusive decorations are correctly highlighted.
- [ ] The UI adheres to ADR 008 styling constraints.
