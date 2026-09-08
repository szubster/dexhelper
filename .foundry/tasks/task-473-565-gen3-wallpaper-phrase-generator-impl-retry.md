---
id: task-473-565-gen3-wallpaper-phrase-generator-impl-retry
type: TASK
title: Implement Gen 3 Wallpaper Phrase Generator (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on:
  - research-473-564-investigate-wallpaper-generator-failure
jules_session_id: null
parent: story-335-473-gen3-wallpaper-phrase-generator
tags:
  - gen3
  - customization
  - algorithm
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Wallpaper Phrase Generator (Retry)

## Objective
Implement the mathematical algorithm to generate the 16 custom PC Box wallpaper unlock phrases based on a Generation 3 Trainer ID, using the research gathered in `research-473-564-investigate-wallpaper-generator-failure`.

## Requirements
*   Read `.foundry/research/research-473-564-investigate-wallpaper-generator-failure.md` to get the correct algorithm, offsets, and character sets.
*   Create a pure utility function `generateWallpaperPhrases(trainerId: number)` within `src/engine/gen3/wallpaper/phraseGenerator.ts`.
*   The function must accept a `trainerId` (number) as input.
*   Implement the specific phrase generation algorithm used by the game.
*   Return an object or array mapping the 16 unlock phrases to their respective wallpaper themes.
*   Write unit tests using Vitest in `src/engine/gen3/wallpaper/__tests__/phraseGenerator.test.ts` to verify generation against known `trainerId` / phrase pairs.
*   Ensure there are no direct side effects.

## Acceptance Criteria
- [ ] Implement the `generateWallpaperPhrases` function using researched logic.
- [ ] Add unit tests verifying accurate phrase generation.
