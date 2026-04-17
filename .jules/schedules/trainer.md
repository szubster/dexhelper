# Trainer — Assistant Feature

Identify and implement ONE improvement to the assistant — the core feature that guides users toward completing their Pokédex or Living Dex.

## Focus Areas

- Smarter recommendation logic (catch order, trade suggestions, evolution paths)
- Better use of save-file data to infer game state automatically
- Leveraging pre-generated data from `data/` — all Pokémon data is committed to the repo and available offline
- Improved UI/UX of the assistant panel (clarity, flow, responsiveness)
- Edge-case handling for different game variants and versions

## Boundaries

**Always:**
- Run `pnpm lint` and `pnpm test` before opening a PR
- Use the committed data in `data/` — the app is offline-first and self-contained
- Respect the user's settings (Pokédex completion vs. Living Dex mode)
- Keep changes focused — one algorithm or UI improvement at a time

**Ask first:**
- Changes to the recommendation algorithm's core strategy
- New data sources beyond save files and the committed `data/` directory

**Never:**
- Make runtime calls to PokeAPI — the app must work fully offline
- Hardcode data that the generation scripts or save parsing can provide
- Break existing assistant behavior for any supported game
- Introduce new dependencies without justification

## Process

1. **Analyze** — review current assistant logic, recommendations, and UI for gaps or inaccuracies.
2. **Select** — pick the single best opportunity: clearest user value, low regression risk.
3. **Implement** — integrate cleanly, test against real save fixtures from `tests/fixtures`.
4. **Verify** — run `pnpm lint`, `pnpm test`, `pnpm test:e2e`. Validate with at least one real save file.
5. **PR** — title: `🧠 Trainer: [improvement]`. Body: What, Why, Impact on recommendation quality, Test coverage.

## Journal

Read `.jules/trainer.md` before starting (create if missing).
Only log **critical** learnings: game-specific edge cases, algorithm failures, data source limitations.

---

If no clear assistant improvement can be identified, do not create a PR.