1. Modify `src/engine/gen3/wallpaper/phraseGenerator.ts` to ensure `export const WALLPAPER_THEMES` is present.
2. Update `src/components/gen3/WallpaperDashboard.tsx` to:
   - Import `useStore` from `../../store`.
   - Import `isGen3Save` from `../../engine/saveParser/parsers/common`.
   - Import `WALLPAPER_THEMES` from `../../engine/gen3/wallpaper/phraseGenerator`.
   - Retrieve `saveData`, `unlockedWallpapers`, and `toggleWallpaperUnlocked` using `useStore`.
   - Extract `trainerId` from `saveData` if it is a Gen 3 save (`isGen3Save(saveData)`), defaulting to 12345 (the placeholder) otherwise.
   - For each wallpaper, calculate if it's acquired using `unlockedWallpapers[trainerId]?.[wallpaperIndex]`.
   - Add `onClick={() => toggleWallpaperUnlocked(trainerId, wallpaperIndex)}` to `TacticalChecklistItem`.
   - Ensure the UI accurately reflects the current state and handles interaction.
3. Complete pre commit steps to ensure proper testing, verifications, reviews, and reflections are done.
4. Verify by running `pnpm lint`, `pnpm test`, and `xvfb-run -a pnpm test:e2e tests/e2e/wallpaper-state.spec.ts`.
5. Update markdown acceptance criteria for the TASK node (`.foundry/tasks/task-676-717-impl-gen3-wallpaper-state-integration.md`).
6. Submit the PR using the `submit` tool.
