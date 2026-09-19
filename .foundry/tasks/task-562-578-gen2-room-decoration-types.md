---
id: task-562-578-gen2-room-decoration-types
type: TASK
title: Gen 2 Room Decoration Types
status: ACTIVE
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '16594263502696587710'
parent: story-313-562-gen2-room-decoration-state-logic
locks: []
rejection_reason: ''
---

# Task: Gen 2 Room Decoration Types

## Overview
Define the TypeScript interfaces and types required for the Gen 2 Room Decoration state logic.

## Requirements
- Define interfaces for the decoration categories: Beds, Plants, Posters, Consoles, Ornaments, Dolls.
- Create an interface `DecorationItem` containing `id`, `name`, `isMysteryGift`, `isActive`, and `isUnlocked`.
- Define the `MysteryGiftExclusives` array for dolls (IDs 22 to 43).

## Acceptance Criteria
- [ ] TypeScript interfaces for Room Decorations are defined.
- [ ] Types are exported for use in the custom hook.
