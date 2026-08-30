---
id: task-473-498-gen3-wallpaper-phrase-generator-impl
type: TASK
title: Implement Gen 3 Wallpaper Phrase Generator
status: ACTIVE
owner_persona: coder
created_at: '2026-08-27'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: '6364905679912756238'
parent: story-335-473-gen3-wallpaper-phrase-generator
tags:
  - gen3
  - customization
  - algorithm
rejection_count: 1
rejection_reason: ''
---

# Implement Gen 3 Wallpaper Phrase Generator

## Objective
Implement the mathematical algorithm to generate the 16 custom PC Box wallpaper unlock phrases based on a Generation 3 Trainer ID.

## Requirements
*   Create a pure utility function `generateWallpaperPhrases(trainerId: number)` within `src/engine/gen3/wallpaper/phraseGenerator.ts`.
*   The function must accept a `trainerId` (number) as input.
*   Implement the specific phrase generation algorithm used by the game (involving character sets and bitwise operations on the TID).
*   Return an object or array mapping the 16 unlock phrases to their respective wallpaper themes.
*   Write unit tests using Vitest in `src/engine/gen3/wallpaper/__tests__/phraseGenerator.test.ts` to verify generation against known `trainerId` / phrase pairs.
*   Ensure there are no direct side effects.

## Acceptance Criteria
- [ ] Implement the `generateWallpaperPhrases` function.
- [ ] Add unit tests verifying accurate phrase generation.
