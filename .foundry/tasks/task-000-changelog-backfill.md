---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: FAILED
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
tags:
  - changelog
  - backfill
priority: 100
research_references: []
rejection_count: 0
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
confidence_score: 100
notes: >-
  Re-opened dynamically by changelog-engine.ts for each commit during repository
  history backfill.
---
# Changelog Backfill Batch Commit Evaluation

Target commit batch (10 commits) injected by `changelog-engine.ts`:

- **Batch Size:** 10
- **Primary Domain:** dexhelper
- **Suggested Overall SemVer Bump:** `minor` (from `0.26.1` -> `0.27.0`)
- **Range:** `2baa254...c4d3e3f`

## Commits in Batch

### Commit 1: `4b21198`
- **Commit SHA:** `4b2119828e140305b383de81fcdaed54cc402f9c`
- **Previous SHA:** `2baa2542db676d524b53d509e156a194197f5143`
- **Date:** `2026-04-09`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps): Bump the react group with 2 updates (#142)

Bumps the react group with 2 updates:
[react](https://github.com/facebook/react/tree/HEAD/packages/react) and
[react-dom](https://github.com/facebook/react/tree/HEAD/packages/react-dom).

Updates `react` from 19.2.4 to 19.2.5
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/facebook/react/releases">react's
releases</a>.</em></p>
<blockquote>
<h2>19.2.5 (April 8th, 2026)</h2>
<h2>React Server Components</h2>
<ul>
<li>Add more cycle protections (<a
href="https://redirect.github.com/facebook/react/pull/36236">#36236</a>
by <a href="https://github.com/eps1lon"><code>@​eps1lon</code></a> and
<a
href="https://github.com/unstubbable"><code>@​unstubbable</code></a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/facebook/react/commit/23f4f9f30da9e9af2108c18bb197bae75ab584ea"><code>23f4f9f</code></a>
19.2.5</li>
<li>See full diff in <a
href="https://github.com/facebook/react/commits/v19.2.5/packages/react">compare
view</a></li>
</ul>
</details>
<br />

Updates `react-dom` from 19.2.4 to 19.2.5
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/facebook/react/releases">react-dom's
releases</a>.</em></p>
<blockquote>
<h2>19.2.5 (April 8th, 2026)</h2>
<h2>React Server Components</h2>
<ul>
<li>Add more cycle protections (<a
href="https://redirect.github.com/facebook/react/pull/36236">#36236</a>
by <a href="https://github.com/eps1lon"><code>@​eps1lon</code></a> and
<a
href="https://github.com/unstubbable"><code>@​unstubbable</code></a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/facebook/react/commit/23f4f9f30da9e9af2108c18bb197bae75ab584ea"><code>23f4f9f</code></a>
19.2.5</li>
<li>See full diff in <a
href="https://github.com/facebook/react/commits/v19.2.5/packages/react-dom">compare
view</a></li>
</ul>
</details>
<br />


Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore <dependency name> major version` will close this
group update PR and stop Dependabot creating any more for the specific
dependency's major version (unless you unignore this specific
dependency's major version or upgrade to it yourself)
- `@dependabot ignore <dependency name> minor version` will close this
group update PR and stop Dependabot creating any more for the specific
dependency's minor version (unless you unignore this specific
dependency's minor version or upgrade to it yourself)
- `@dependabot ignore <dependency name>` will close this group update PR
and stop Dependabot creating any more for the specific dependency
(unless you unignore this specific dependency or upgrade to it yourself)
- `@dependabot unignore <dependency name>` will remove all of the ignore
conditions of the specified dependency
- `@dependabot unignore <dependency name> <ignore condition>` will
remove the ignore condition of the specified dependency and ignore
conditions


</details>

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package-lock.json`
- `package.json`

#### Diff Summary
```text
4b2119828 build(deps): Bump the react group with 2 updates (#142)
 package-lock.json | 30 +++++++++---------------------
 package.json      |  4 ++--
 2 files changed, 11 insertions(+), 23 deletions(-)
```

### Commit 2: `3596f15`
- **Commit SHA:** `3596f15faa082edd01e3b12929f688573f814ee6`
- **Previous SHA:** `4b2119828e140305b383de81fcdaed54cc402f9c`
- **Date:** `2026-04-09`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
Biome Phase 3.1: Security & Critical Correctness (#140)

This PR enables security rules and critical correctness rules (unused
imports, variables, and private members). Total of 15 files were fixed
to satisfy the new requirements. All unit and E2E tests pass.

### Automation & Stability Update (Latest fixes)
- **Automated Workflow**: Added a `postinstall` script to ensure
Lefthook is always initialized for all developers and agents.
- **Improved Hook Performance**: Enabled `stage_fixed` and
`fail_on_changes` in Lefthook for seamless local auto-formatting and
strict CI verification.
- **Refined Exclusions**: Excluded the generated route tree
(`src/routeTree.gen.ts`) from linting/formatting checks while preserving
type information for the scanner.
```

#### Modified Files
- `.serena/memories/infrastructure/biome_migration_status.md`
- `biome.json`
- `lefthook.yml`
- `package-lock.json`
- `package.json`
- `src/components/AppLayout.tsx`
- `src/components/AssistantPanel.tsx`
- `src/components/PokedexGrid.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/SearchAndFilters.tsx`
- `src/components/VersionModal.tsx`
- `src/components/assistant/AssistantDebugView.tsx`
- `src/components/pokemon/details/PokemonCatchProbability.tsx`
- `src/components/pokemon/details/PokemonCaughtDetails.tsx`
- `src/components/pokemon/details/PokemonLocations.tsx`
- `src/components/pokemon/details/PokemonStats.tsx`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/mapGraph/index.ts`
- `src/engine/saveParser/repro.test.ts`
- `src/routeTree.gen.ts`

#### Diff Summary
```text
3596f15fa Biome Phase 3.1: Security & Critical Correctness (#140)
 .../infrastructure/biome_migration_status.md       |   8 +-
 biome.json                                         |  11 +-
 lefthook.yml                                       |   4 +-
 package-lock.json                                  |   1 +
 package.json                                       |   3 +-
 src/components/AppLayout.tsx                       |   2 -
 src/components/AssistantPanel.tsx                  |  26 +----
 src/components/PokedexGrid.tsx                     |   2 +-
 src/components/PokemonDetails.tsx                  |  84 ++++-----------
 src/components/SearchAndFilters.tsx                |   1 -
 src/components/VersionModal.tsx                    |   1 -
 src/components/assistant/AssistantDebugView.tsx    |   1 -
 .../pokemon/details/PokemonCatchProbability.tsx    |   2 +-
 .../pokemon/details/PokemonCaughtDetails.tsx       |   1 -
 .../pokemon/details/PokemonLocations.tsx           |   1 -
 src/components/pokemon/details/PokemonStats.tsx    |   2 +-
 src/engine/assistant/suggestionEngine.ts           |   7 +-
 src/engine/mapGraph/index.ts                       |   2 +-
 src/engine/saveParser/repro.test.ts                |   1 -
 src/routeTree.gen.ts                               | 116 ++++++++++-----------
 20 files changed, 107 insertions(+), 169 deletions(-)
```

### Commit 3: `c7e1e4a`
- **Commit SHA:** `c7e1e4a7a9786852dec82f22894846e482f34b3d`
- **Previous SHA:** `2eaee3cb0b274955c4dff0040b138e63587010b3`
- **Date:** `2026-04-09`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: Biome Phase 3.2 - General Correctness & Imports (#150)

Enabled stricter correctness checks and automated import management as
part of Biome migration Phase 3.2.

Key Changes:
- Enabled , , , and .
- Enforced  for type-only imports.
- Enabled automated import organization (sorting).
- Applied safe and unsafe fixes to 61 files.
- Respected user's change to `lineWidth: 120`.

Verification:
- `npm run check:biome` passed.
- All unit and E2E tests passed.
```

#### Modified Files
- `.serena/memories/infrastructure/biome_migration_status.md`
- `biome.json`
- `biome_impact.txt`
- `lefthook.yml`
- `src/components/AppLayout.tsx`
- `src/components/AssistantPanel.tsx`
- `src/components/BottomNav.tsx`
- `src/components/PokedexGrid.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/SearchAndFilters.tsx`
- `src/components/SettingsModal.tsx`
- `src/components/StorageGrid.tsx`
- `src/components/VersionModal.tsx`
- `src/components/assistant/AssistantDebugView.tsx`
- `src/components/assistant/AssistantSuggestionCard.tsx`
- `src/components/pokemon/PokemonSprite.tsx`
- `src/components/pokemon/details/PokemonCatchProbability.tsx`
- `src/components/pokemon/details/PokemonCaughtDetails.tsx`
- `src/components/pokemon/details/PokemonEvolutions.tsx`
- `src/components/pokemon/details/PokemonLocations.tsx`
- `src/components/pokemon/details/PokemonStats.tsx`
- `src/engine/assistant/__tests__/gen1Strategy.test.ts`
- `src/engine/assistant/__tests__/suggestionEngine.fix.test.ts`
- `src/engine/assistant/__tests__/suggestionEngine.repro.test.ts`
- `src/engine/assistant/index.ts`
- `src/engine/assistant/strategies/gen1Strategy.ts`
- `src/engine/assistant/strategies/index.ts`
- `src/engine/assistant/strategies/types.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/data/gen1/assistantData.ts`
- `src/engine/exclusives/__tests__/gen1Exclusives.test.ts`
- `src/engine/exclusives/gen1Exclusives.ts`
- `src/engine/exclusives/index.ts`
- `src/engine/mapGraph/gen1Graph.test.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/mapGraph/index.ts`
- `src/engine/saveParser/index.test.ts`
- `src/engine/saveParser/index.ts`
- `src/engine/saveParser/repro.test.ts`
- `src/engine/saveParser/saveParser.test.ts`
- `src/hooks/useAssistant.test.ts`
- `src/hooks/useAssistant.ts`
- `src/main.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/pokemon.$pokemonId.tsx`
- `src/routes/storage.tsx`
- `src/store.test.ts`
- `src/store.ts`
- `src/utils/cn.ts`
- `src/utils/data.ts`
- `src/utils/generationConfig.test.ts`
- `src/utils/generationConfig.ts`
- `src/utils/pokeapi.test.ts`
- `src/utils/pokemonQueries.ts`
- `tests/e2e/filtering_logic.spec.ts`
- `tests/e2e/home.spec.ts`
- `tests/e2e/save_management.spec.ts`
- `tests/e2e/test-utils.ts`
- `tests/e2e/version_selection.spec.ts`

#### Diff Summary
```text
c7e1e4a7a feat: Biome Phase 3.2 - General Correctness & Imports (#150)
 .../infrastructure/biome_migration_status.md       |    6 +-
 biome.json                                         |   13 +-
 biome_impact.txt                                   | 1686 ++++++++++++++++++++
 lefthook.yml                                       |    2 +
 src/components/AppLayout.tsx                       |   52 +-
 src/components/AssistantPanel.tsx                  |   29 +-
 src/components/BottomNav.tsx                       |   17 +-
 src/components/PokedexGrid.tsx                     |   52 +-
 src/components/PokemonDetails.tsx                  |   77 +-
 src/components/SearchAndFilters.tsx                |   10 +-
 src/components/SettingsModal.tsx                   |   34 +-
 src/components/StorageGrid.tsx                     |   28 +-
 src/components/VersionModal.tsx                    |   11 +-
 src/components/assistant/AssistantDebugView.tsx    |   42 +-
 .../assistant/AssistantSuggestionCard.tsx          |   31 +-
 src/components/pokemon/PokemonSprite.tsx           |    2 +-
 .../pokemon/details/PokemonCatchProbability.tsx    |    9 +-
 .../pokemon/details/PokemonCaughtDetails.tsx       |   26 +-
 .../pokemon/details/PokemonEvolutions.tsx          |   21 +-
 .../pokemon/details/PokemonLocations.tsx           |   46 +-
 src/components/pokemon/details/PokemonStats.tsx    |   10 +-
 .../assistant/__tests__/gen1Strategy.test.ts       |    4 +-
 .../__tests__/suggestionEngine.fix.test.ts         |    2 +-
 .../__tests__/suggestionEngine.repro.test.ts       |    6 +-
 src/engine/assistant/index.ts                      |    2 +-
 src/engine/assistant/strategies/gen1Strategy.ts    |   17 +-
 src/engine/assistant/strategies/index.ts           |    2 +-
 src/engine/assistant/strategies/types.ts           |   30 +-
 src/engine/assistant/suggestionEngine.ts           |   96 +-
 src/engine/data/gen1/assistantData.ts              |    5 +-
 .../exclusives/__tests__/gen1Exclusives.test.ts    |    2 +-
 src/engine/exclusives/gen1Exclusives.ts            |    2 +-
 src/engine/exclusives/index.ts                     |    3 +-
 src/engine/mapGraph/gen1Graph.test.ts              |    2 +-
 src/engine/mapGraph/gen1Graph.ts                   |    5 +-
 src/engine/mapGraph/index.ts                       |    8 +-
 src/engine/saveParser/index.test.ts                |    8 +-
 src/engine/saveParser/index.ts                     |   24 +-
 src/engine/saveParser/repro.test.ts                |    4 +-
 src/engine/saveParser/saveParser.test.ts           |    6 +-
 src/hooks/useAssistant.test.ts                     |   12 +-
 src/hooks/useAssistant.ts                          |   13 +-
 src/main.tsx                                       |    4 +-
 src/routes/__root.tsx                              |    4 +-
 src/routes/index.tsx                               |    2 +-
 src/routes/pokemon.$pokemonId.tsx                  |    4 +-
 src/routes/storage.tsx                             |    2 +-
 src/store.test.ts                                  |    2 +-
 src/store.ts                                       |    2 +-
 src/utils/cn.ts                                    |    2 +-
 src/utils/data.ts                                  |    2 +-
 src/utils/generationConfig.test.ts                 |    4 +-
 src/utils/generationConfig.ts                      |   12 +-
 src/utils/pokeapi.test.ts                          |   28 +-
 src/utils/pokemonQueries.ts                        |    4 +-
 tests/e2e/filtering_logic.spec.ts                  |    2 +-
 tests/e2e/home.spec.ts                             |    2 +-
 tests/e2e/save_management.spec.ts                  |    4 +-
 tests/e2e/test-utils.ts                            |    2 +-
 tests/e2e/version_selection.spec.ts                |    2 +-
 60 files changed, 1955 insertions(+), 586 deletions(-)
```

### Commit 4: `aaa0f53`
- **Commit SHA:** `aaa0f53e013398e5699c1c5a785a371b646326c1`
- **Previous SHA:** `c7e1e4a7a9786852dec82f22894846e482f34b3d`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
chore: Fix remaining biome warnings and style errors (#151)

This PR fixes remaining styling, suspicious, and no-non-null-assertion
errors caught by Biome in the project. Tests have been verified to pass
successfully.
```

#### Modified Files
- `.env.example`
- `biome.json`
- `biome_impact.txt`
- `src/components/AppLayout.tsx`
- `src/components/AssistantPanel.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/SettingsModal.tsx`
- `src/components/StorageGrid.tsx`
- `src/components/assistant/AssistantDebugView.tsx`
- `src/components/assistant/AssistantSuggestionCard.tsx`
- `src/components/pokemon/details/PokemonCatchProbability.tsx`
- `src/components/pokemon/details/PokemonCaughtDetails.tsx`
- `src/components/pokemon/details/PokemonEvolutions.tsx`
- `src/components/pokemon/details/PokemonLocations.tsx`
- `src/components/pokemon/details/PokemonStats.tsx`
- `src/engine/assistant/__tests__/gen1Strategy.test.ts`
- `src/engine/assistant/__tests__/suggestionEngine.fix.test.ts`
- `src/engine/assistant/strategies/gen1Strategy.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/saveParser/index.ts`
- `src/engine/saveParser/saveParser.test.ts`
- `src/hooks/useAssistant.test.ts`
- `src/hooks/useAssistant.ts`
- `src/main.tsx`
- `src/utils/generationConfig.ts`
- `src/utils/pokeapi.test.ts`
- `src/utils/pokemonQueries.ts`
- `src/vite-env.d.ts`

#### Diff Summary
```text
aaa0f53e0 chore: Fix remaining biome warnings and style errors (#151)
 .env.example                                       |   18 -
 biome.json                                         |    5 -
 biome_impact.txt                                   | 1686 --------------------
 src/components/AppLayout.tsx                       |    8 +-
 src/components/AssistantPanel.tsx                  |   15 +-
 src/components/PokemonDetails.tsx                  |   39 +-
 src/components/SettingsModal.tsx                   |    4 +-
 src/components/StorageGrid.tsx                     |    5 +-
 src/components/assistant/AssistantDebugView.tsx    |    6 +-
 .../assistant/AssistantSuggestionCard.tsx          |   10 +-
 .../pokemon/details/PokemonCatchProbability.tsx    |   12 +-
 .../pokemon/details/PokemonCaughtDetails.tsx       |    7 +-
 .../pokemon/details/PokemonEvolutions.tsx          |   40 +-
 .../pokemon/details/PokemonLocations.tsx           |   24 +-
 src/components/pokemon/details/PokemonStats.tsx    |    8 +-
 .../assistant/__tests__/gen1Strategy.test.ts       |    6 +-
 .../__tests__/suggestionEngine.fix.test.ts         |   14 +-
 src/engine/assistant/strategies/gen1Strategy.ts    |    2 +-
 src/engine/assistant/suggestionEngine.ts           |  105 +-
 src/engine/mapGraph/gen1Graph.ts                   |    8 +-
 src/engine/saveParser/index.ts                     |   20 +-
 src/engine/saveParser/saveParser.test.ts           |   12 +-
 src/hooks/useAssistant.test.ts                     |   19 +-
 src/hooks/useAssistant.ts                          |    4 +-
 src/main.tsx                                       |    5 +-
 src/utils/generationConfig.ts                      |    2 +-
 src/utils/pokeapi.test.ts                          |   16 +-
 src/utils/pokemonQueries.ts                        |    3 +-
 src/vite-env.d.ts                                  |    2 +
 29 files changed, 260 insertions(+), 1845 deletions(-)
```

### Commit 5: `4b3beb7`
- **Commit SHA:** `4b3beb784b35b5cf135a8e28f4d48b99d9d295ab`
- **Previous SHA:** `aaa0f53e013398e5699c1c5a785a371b646326c1`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
chore: enable remaining biome rules and configure biome.jsonc (#152)

Converted biome configuration to .jsonc format to support comments, and
re-enabled all linting rules except for a11y UI rules and hex number
literal keys (essential for parsing binary files).
```

#### Modified Files
- `biome.json`
- `biome.jsonc`
- `src/components/PokemonDetails.tsx`
- `src/components/assistant/AssistantDebugView.tsx`
- `src/engine/assistant/__tests__/suggestionEngine.repro.test.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/saveParser/index.ts`
- `src/engine/saveParser/repro.test.ts`
- `src/engine/saveParser/saveParser.test.ts`

#### Diff Summary
```text
4b3beb784 chore: enable remaining biome rules and configure biome.jsonc (#152)
 biome.json => biome.jsonc                             | 19 +++----------------
 src/components/PokemonDetails.tsx                     |  4 ++--
 src/components/assistant/AssistantDebugView.tsx       | 14 +++++---------
 .../__tests__/suggestionEngine.repro.test.ts          |  4 ++--
 src/engine/assistant/suggestionEngine.ts              | 10 +++++-----
 src/engine/saveParser/index.ts                        |  4 ++--
 src/engine/saveParser/repro.test.ts                   |  4 ++--
 src/engine/saveParser/saveParser.test.ts              |  4 ++--
 8 files changed, 23 insertions(+), 40 deletions(-)
```

### Commit 6: `db0411e`
- **Commit SHA:** `db0411e7940476f9050bf623ba9042dc840c2208`
- **Previous SHA:** `4b3beb784b35b5cf135a8e28f4d48b99d9d295ab`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
chore: strict biome output and info fixes (#153)

Elevated useNodejsImportProtocol to error in biome config to ensure node
module imports are caught. Fixed all remaining style info diagnostics
across the codebase so biome gives zero output. Appended
--error-on-warnings flag to package.json scripts for strict CI checks.
```

#### Modified Files
- `.serena/memories/infrastructure/biome_migration_status.md`
- `biome.jsonc`
- `package.json`
- `tests/e2e/save_management.spec.ts`
- `tests/e2e/test-utils.ts`

#### Diff Summary
```text
db0411e79 chore: strict biome output and info fixes (#153)
 .serena/memories/infrastructure/biome_migration_status.md | 7 ++++---
 biome.jsonc                                               | 3 +++
 package.json                                              | 6 +++---
 tests/e2e/save_management.spec.ts                         | 2 +-
 tests/e2e/test-utils.ts                                   | 2 +-
 5 files changed, 12 insertions(+), 8 deletions(-)
```

### Commit 7: `1c3a212`
- **Commit SHA:** `1c3a2124ee78c2125a5e853251fb31afae0e40ac`
- **Previous SHA:** `db0411e7940476f9050bf623ba9042dc840c2208`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps): Bump lucide-react from 1.7.0 to 1.8.0 (#157)

Bumps
[lucide-react](https://github.com/lucide-icons/lucide/tree/HEAD/packages/lucide-react)
from 1.7.0 to 1.8.0.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/lucide-icons/lucide/releases">lucide-react's
releases</a>.</em></p>
<blockquote>
<h2>Version 1.8.0</h2>
<h2>What's Changed</h2>
<ul>
<li>docs(packages/angular): add packageDirname for
<code>@​lucide/angular</code> by <a
href="https://github.com/rhutchison"><code>@​rhutchison</code></a> in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4211">lucide-icons/lucide#4211</a></li>
<li>chore(icons): Username change knarlix to RajnishKMehta by <a
href="https://github.com/RajnishKMehta"><code>@​RajnishKMehta</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4208">lucide-icons/lucide#4208</a></li>
<li>ci(<code>@​lucide/angular</code>): Fix publishing problem by <a
href="https://github.com/ericfennis"><code>@​ericfennis</code></a> in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4213">lucide-icons/lucide#4213</a></li>
<li>docs: fix broken links in pull_request_template.md (got 404 page) by
<a
href="https://github.com/whoisBugsbunny"><code>@​whoisBugsbunny</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4224">lucide-icons/lucide#4224</a></li>
<li>fix(lucide-static): add viewBox to sprite symbol elements by <a
href="https://github.com/TomaTV"><code>@​TomaTV</code></a> in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4223">lucide-icons/lucide#4223</a></li>
<li>docs: Fix link to icon design principles in statement by <a
href="https://github.com/whoisBugsbunny"><code>@​whoisBugsbunny</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4225">lucide-icons/lucide#4225</a></li>
<li>feat(docs): add Zephyr Cloud to Hero Backers tier by <a
href="https://github.com/karsa-mistmere"><code>@​karsa-mistmere</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4226">lucide-icons/lucide#4226</a></li>
<li>fix(icons): fixes gap issues in radio-off.svg by <a
href="https://github.com/karsa-mistmere"><code>@​karsa-mistmere</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4227">lucide-icons/lucide#4227</a></li>
<li>fix(icons): renamed <code>text-select</code> to
<code>square-dashed-text</code> by <a
href="https://github.com/jguddas"><code>@​jguddas</code></a> in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/3943">lucide-icons/lucide#3943</a></li>
<li>fix(docs): improve mobile layout of v1 banner by <a
href="https://github.com/karsa-mistmere"><code>@​karsa-mistmere</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4254">lucide-icons/lucide#4254</a></li>
<li>fix(<code>@​lucide/svelte</code>): aria-hidden=&quot;true&quot; was
never set by <a href="https://github.com/blt-r"><code>@​blt-r</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4234">lucide-icons/lucide#4234</a></li>
<li>fix(icons): remove ui/ux tag from heart-minus, add delete instead by
<a
href="https://github.com/karsa-mistmere"><code>@​karsa-mistmere</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4266">lucide-icons/lucide#4266</a></li>
<li>chore(deps-dev): bump vite from 7.3.1 to 7.3.2 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4276">lucide-icons/lucide#4276</a></li>
<li>chore(deps): bump lodash-es from 4.17.23 to 4.18.1 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4251">lucide-icons/lucide#4251</a></li>
<li>chore(deps): bump vite from 5.4.21 to 6.4.2 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4286">lucide-icons/lucide#4286</a></li>
<li>feat(docs): use <code>initOnMounted: true</code> for
<code>useSessionStorage</code> in <code>CarbonAdOverlay</code> by <a
href="https://github.com/karsa-mistmere"><code>@​karsa-mistmere</code></a>
in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4275">lucide-icons/lucide#4275</a></li>
<li>feat(icons): added <code>bookmark-off</code> icon by <a
href="https://github.com/ZeenatLawal"><code>@​ZeenatLawal</code></a> in
<a
href="https://redirect.github.com/lucide-icons/lucide/pull/4283">lucide-icons/lucide#4283</a></li>
</ul>
<h2>New Contributors</h2>
<ul>
<li><a
href="https://github.com/rhutchison"><code>@​rhutchison</code></a> made
their first contribution in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4211">lucide-icons/lucide#4211</a></li>
<li><a
href="https://github.com/whoisBugsbunny"><code>@​whoisBugsbunny</code></a>
made their first contribution in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4224">lucide-icons/lucide#4224</a></li>
<li><a href="https://github.com/TomaTV"><code>@​TomaTV</code></a> made
their first contribution in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4223">lucide-icons/lucide#4223</a></li>
<li><a href="https://github.com/blt-r"><code>@​blt-r</code></a> made
their first contribution in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4234">lucide-icons/lucide#4234</a></li>
<li><a
href="https://github.com/ZeenatLawal"><code>@​ZeenatLawal</code></a>
made their first contribution in <a
href="https://redirect.github.com/lucide-icons/lucide/pull/4283">lucide-icons/lucide#4283</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a
href="https://github.com/lucide-icons/lucide/compare/1.7.0...1.8.0">https://github.com/lucide-icons/lucide/compare/1.7.0...1.8.0</a></p>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/lucide-icons/lucide/commit/7623e23f787fe78e5075a613fd22da2cecbb9b1b"><code>7623e23</code></a>
feat(docs): add Zephyr Cloud to Hero Backers tier &amp; rework
updateSponsors scr...</li>
<li>See full diff in <a
href="https://github.com/lucide-icons/lucide/commits/1.8.0/packages/lucide-react">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=lucide-react&package-manager=npm_and_yarn&previous-version=1.7.0&new-version=1.8.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop
Dependabot creating any more for this major version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop
Dependabot creating any more for this minor version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop
Dependabot creating any more for this dependency (unless you reopen the
PR or upgrade to it yourself)


</details>

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package-lock.json`
- `package.json`

#### Diff Summary
```text
1c3a2124e build(deps): Bump lucide-react from 1.7.0 to 1.8.0 (#157)
 package-lock.json | 8 ++++----
 package.json      | 2 +-
 2 files changed, 5 insertions(+), 5 deletions(-)
```

### Commit 8: `ba58212`
- **Commit SHA:** `ba582129fbc92d3daef29f59718a0dd837a7f563`
- **Previous SHA:** `1c3a2124ee78c2125a5e853251fb31afae0e40ac`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump @biomejs/biome from 2.4.10 to 2.4.11 (#156)

Bumps
[@biomejs/biome](https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome)
from 2.4.10 to 2.4.11.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/biomejs/biome/releases"><code>@​biomejs/biome</code>'s
releases</a>.</em></p>
<blockquote>
<h2>Biome CLI v2.4.11</h2>
<h2>2.4.11</h2>
<h3>Patch Changes</h3>
<ul>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9350">#9350</a> <a
href="https://github.com/biomejs/biome/commit/4af4a3a9ca31a598e9836997b7811992eae53387"><code>4af4a3a</code></a>
Thanks <a href="https://github.com/dyc3"><code>@​dyc3</code></a>! -
Added the new nursery rule <a
href="https://biomejs.dev/linter/rules/use-consistent-test-it/">useConsistentTestIt</a>
in the <code>test</code> domain. The rule enforces consistent use of
either <code>it</code> or <code>test</code> for test functions in
Jest/Vitest suites, with separate control for top-level tests and tests
inside <code>describe</code> blocks.</p>
<p>Invalid:</p>
<pre lang="js"><code>test(&quot;should fly&quot;, () =&gt; {}); //
Top-level test using 'test' flagged, convert to 'it'
<p>describe(&quot;pig&quot;, () =&gt; {<br />
test(&quot;should fly&quot;, () =&gt; {}); // Test inside 'describe'
using 'test' flagged, convert to 'it'<br />
});<br />
</code></pre></p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9429">#9429</a> <a
href="https://github.com/biomejs/biome/commit/a2f3f7eb3a134ccc6851ed0eec19d1ff1636ec72"><code>a2f3f7e</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Added the new nursery lint rule <a
href="https://biomejs.dev/linter/rules/use-explicit-return-type"><code>useExplicitReturnType</code></a>.
It reports TypeScript functions and methods that omit an explicit return
type.</p>
<pre lang="ts"><code>function toString(x: any) {
  // rule triggered, it doesn't declare a return type
  return x.toString();
}
</code></pre>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9828">#9828</a> <a
href="https://github.com/biomejs/biome/commit/9e40844261cf7b8c573e340e11e3297ef08bcd60"><code>9e40844</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Fixed <a
href="https://redirect.github.com/biomejs/biome/issues/9484">#9484</a>:
the formatter no longer panics when formatting files that contain
<code>graphql</code> tagged template literals combined with
parenthesized expressions.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9886">#9886</a> <a
href="https://github.com/biomejs/biome/commit/e7c681ecbb6aed471c914167f5d067d327792f44"><code>e7c681e</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Fixed an issue where, occasionally, some bindings and references were
not properly tracked, causing false positives from <a
href="https://biomejs.dev/linter/rules/no-unused-variables/"><code>noUnusedVariables</code></a>
and <a
href="https://biomejs.dev/linter/rules/no-undeclared-variables/"><code>noUndeclaredVariables</code></a>
in Svelte, Vue, and Astro files.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9760">#9760</a> <a
href="https://github.com/biomejs/biome/commit/5b16d187ba63800f4b6ea5057d551ae3f2fbc68c"><code>5b16d18</code></a>
Thanks <a href="https://github.com/myx0m0p"><code>@​myx0m0p</code></a>!
- Fixed <a
href="https://redirect.github.com/biomejs/biome/issues/4093">#4093</a>:
the <a
href="https://biomejs.dev/linter/rules/no-delete/"><code>noDelete</code></a>
rule no longer triggers for <code>delete process.env.FOO</code>, since
<code>delete</code> is the documented way to remove environment
variables in Node.js.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9799">#9799</a> <a
href="https://github.com/biomejs/biome/commit/2af8efd348cfa992bc7d35683de55bb8cc583260"><code>2af8efd</code></a>
Thanks <a
href="https://github.com/minseong0324"><code>@​minseong0324</code></a>!
- Added the rule <a
href="https://biomejs.dev/linter/rules/no-misleading-return-type/"><code>noMisleadingReturnType</code></a>.
The rule detects when a function's return type annotation is wider than
what the implementation actually returns.</p>
<pre lang="ts"><code>// Flagged: `: string` is wider than
`&quot;loading&quot; | &quot;idle&quot;`
function getStatus(b: boolean): string {
  if (b) return &quot;loading&quot;;
  return &quot;idle&quot;;
}
</code></pre>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9880">#9880</a> <a
href="https://github.com/biomejs/biome/commit/7f67749e77af6e5af3dfc72a02bb99718695612e"><code>7f67749</code></a>
Thanks <a href="https://github.com/dyc3"><code>@​dyc3</code></a>! -
Improved the diagnostics for <a
href="https://biomejs.dev/linter/rules/use-find/"><code>useFind</code></a>
to better explain the problem, why it matters, and how to fix it.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9755">#9755</a> <a
href="https://github.com/biomejs/biome/commit/bff7bdb1355cdf7d219a288e31c5c5a0357e3aad"><code>bff7bdb</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Improved performance of fix-all operations (<code>--write</code>). Biome
is now smarter when it runs lint rules and assist actions. First, it
runs only rules that have code fixes, and then runs the rest of the
rules.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/8651">#8651</a> <a
href="https://github.com/biomejs/biome/commit/aafca2d086eb24226a9cf1a69179561f70d02773"><code>aafca2d</code></a>
Thanks <a
href="https://github.com/siketyan"><code>@​siketyan</code></a>! - Add a
new lint rule <code>useDisposables</code> for JavaScript, which detects
disposable objects assigned to variables without <code>using</code> or
<code>await using</code> syntax. Disposable objects that implement the
<code>Disposable</code> or <code>AsyncDisposable</code> interface are
intended to be disposed of after use. Not disposing them can lead to
resource or memory leaks, depending on the implementation.</p>
<p><strong>Invalid:</strong></p>
</li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a
href="https://github.com/biomejs/biome/blob/main/packages/@biomejs/biome/CHANGELOG.md"><code>@​biomejs/biome</code>'s
changelog</a>.</em></p>
<blockquote>
<h2>2.4.11</h2>
<h3>Patch Changes</h3>
<ul>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9350">#9350</a> <a
href="https://github.com/biomejs/biome/commit/4af4a3a9ca31a598e9836997b7811992eae53387"><code>4af4a3a</code></a>
Thanks <a href="https://github.com/dyc3"><code>@​dyc3</code></a>! -
Added the new nursery rule <a
href="https://biomejs.dev/linter/rules/use-consistent-test-it/">useConsistentTestIt</a>
in the <code>test</code> domain. The rule enforces consistent use of
either <code>it</code> or <code>test</code> for test functions in
Jest/Vitest suites, with separate control for top-level tests and tests
inside <code>describe</code> blocks.</p>
<p>Invalid:</p>
<pre lang="js"><code>test(&quot;should fly&quot;, () =&gt; {}); //
Top-level test using 'test' flagged, convert to 'it'
<p>describe(&quot;pig&quot;, () =&gt; {<br />
test(&quot;should fly&quot;, () =&gt; {}); // Test inside 'describe'
using 'test' flagged, convert to 'it'<br />
});<br />
</code></pre></p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9429">#9429</a> <a
href="https://github.com/biomejs/biome/commit/a2f3f7eb3a134ccc6851ed0eec19d1ff1636ec72"><code>a2f3f7e</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Added the new nursery lint rule <a
href="https://biomejs.dev/linter/rules/use-explicit-return-type"><code>useExplicitReturnType</code></a>.
It reports TypeScript functions and methods that omit an explicit return
type.</p>
<pre lang="ts"><code>function toString(x: any) {
  // rule triggered, it doesn't declare a return type
  return x.toString();
}
</code></pre>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9828">#9828</a> <a
href="https://github.com/biomejs/biome/commit/9e40844261cf7b8c573e340e11e3297ef08bcd60"><code>9e40844</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Fixed <a
href="https://redirect.github.com/biomejs/biome/issues/9484">#9484</a>:
the formatter no longer panics when formatting files that contain
<code>graphql</code> tagged template literals combined with
parenthesized expressions.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9886">#9886</a> <a
href="https://github.com/biomejs/biome/commit/e7c681ecbb6aed471c914167f5d067d327792f44"><code>e7c681e</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Fixed an issue where, occasionally, some bindings and references were
not properly tracked, causing false positives from <a
href="https://biomejs.dev/linter/rules/no-unused-variables/"><code>noUnusedVariables</code></a>
and <a
href="https://biomejs.dev/linter/rules/no-undeclared-variables/"><code>noUndeclaredVariables</code></a>
in Svelte, Vue, and Astro files.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9760">#9760</a> <a
href="https://github.com/biomejs/biome/commit/5b16d187ba63800f4b6ea5057d551ae3f2fbc68c"><code>5b16d18</code></a>
Thanks <a href="https://github.com/myx0m0p"><code>@​myx0m0p</code></a>!
- Fixed <a
href="https://redirect.github.com/biomejs/biome/issues/4093">#4093</a>:
the <a
href="https://biomejs.dev/linter/rules/no-delete/"><code>noDelete</code></a>
rule no longer triggers for <code>delete process.env.FOO</code>, since
<code>delete</code> is the documented way to remove environment
variables in Node.js.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9799">#9799</a> <a
href="https://github.com/biomejs/biome/commit/2af8efd348cfa992bc7d35683de55bb8cc583260"><code>2af8efd</code></a>
Thanks <a
href="https://github.com/minseong0324"><code>@​minseong0324</code></a>!
- Added the rule <a
href="https://biomejs.dev/linter/rules/no-misleading-return-type/"><code>noMisleadingReturnType</code></a>.
The rule detects when a function's return type annotation is wider than
what the implementation actually returns.</p>
<pre lang="ts"><code>// Flagged: `: string` is wider than
`&quot;loading&quot; | &quot;idle&quot;`
function getStatus(b: boolean): string {
  if (b) return &quot;loading&quot;;
  return &quot;idle&quot;;
}
</code></pre>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9880">#9880</a> <a
href="https://github.com/biomejs/biome/commit/7f67749e77af6e5af3dfc72a02bb99718695612e"><code>7f67749</code></a>
Thanks <a href="https://github.com/dyc3"><code>@​dyc3</code></a>! -
Improved the diagnostics for <a
href="https://biomejs.dev/linter/rules/use-find/"><code>useFind</code></a>
to better explain the problem, why it matters, and how to fix it.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/9755">#9755</a> <a
href="https://github.com/biomejs/biome/commit/bff7bdb1355cdf7d219a288e31c5c5a0357e3aad"><code>bff7bdb</code></a>
Thanks <a
href="https://github.com/ematipico"><code>@​ematipico</code></a>! -
Improved performance of fix-all operations (<code>--write</code>). Biome
is now smarter when it runs lint rules and assist actions. First, it
runs only rules that have code fixes, and then runs the rest of the
rules.</p>
</li>
<li>
<p><a
href="https://redirect.github.com/biomejs/biome/pull/8651">#8651</a> <a
href="https://github.com/biomejs/biome/commit/aafca2d086eb24226a9cf1a69179561f70d02773"><code>aafca2d</code></a>
Thanks <a
href="https://github.com/siketyan"><code>@​siketyan</code></a>! - Add a
new lint rule <code>useDisposables</code> for JavaScript, which detects
disposable objects assigned to variables without <code>using</code> or
<code>await using</code> syntax. Disposable objects that implement the
<code>Disposable</code> or <code>AsyncDisposable</code> interface are
intended to be disposed of after use. Not disposing them can lead to
resource or memory leaks, depending on the implementation.</p>
<p><strong>Invalid:</strong></p>
<pre lang="js"><code></code></pre>
</li>
</ul>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/biomejs/biome/commit/a2933bffd7251d3ed9e9461f148b19572ced10d6"><code>a2933bf</code></a>
ci: release (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9733">#9733</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/e8cad58a1baf8f8c935e8547da88905cfbfb05be"><code>e8cad58</code></a>
feat(js_analyze): implement useQwikLoaderLocation (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9809">#9809</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/2af8efd348cfa992bc7d35683de55bb8cc583260"><code>2af8efd</code></a>
feat(lint): add nursery rule <code>noMisleadingReturnType</code> (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9799">#9799</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/a2f3f7eb3a134ccc6851ed0eec19d1ff1636ec72"><code>a2f3f7e</code></a>
feat(lint): rule <code>useExplicitReturnType</code> (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9429">#9429</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/aafca2d086eb24226a9cf1a69179561f70d02773"><code>aafca2d</code></a>
feat(js/lint): implement rule <code>useDisposables</code> (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/8651">#8651</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/49f00a38d64af131178ba4e096155d22055aa1c4"><code>49f00a3</code></a>
feat(lint): add ternary expression detection to useNullishCoalescing (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9248">#9248</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/4af4a3a9ca31a598e9836997b7811992eae53387"><code>4af4a3a</code></a>
feat(lint/js): add <code>useConsistentTestIt</code> (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9350">#9350</a>)</li>
<li><a
href="https://github.com/biomejs/biome/commit/1417c3b4ece262b1500b12c9f1da1429e4d53fc4"><code>1417c3b</code></a>
feat(lint/js): add <code>noUselessTypeConversion</code> (<a
href="https://github.com/biomejs/biome/tree/HEAD/packages/@biomejs/biome/issues/9701">#9701</a>)</li>
<li>See full diff in <a
href="https://github.com/biomejs/biome/commits/@biomejs/biome@2.4.11/packages/@biomejs/biome">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@biomejs/biome&package-manager=npm_and_yarn&previous-version=2.4.10&new-version=2.4.11)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore this major version` will close this PR and stop
Dependabot creating any more for this major version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this minor version` will close this PR and stop
Dependabot creating any more for this minor version (unless you reopen
the PR or upgrade to it yourself)
- `@dependabot ignore this dependency` will close this PR and stop
Dependabot creating any more for this dependency (unless you reopen the
PR or upgrade to it yourself)


</details>

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package-lock.json`
- `package.json`

#### Diff Summary
```text
ba582129f build(deps-dev): Bump @biomejs/biome from 2.4.10 to 2.4.11 (#156)
 package-lock.json | 72 +++++++++++++++++++++++++++----------------------------
 package.json      |  2 +-
 2 files changed, 37 insertions(+), 37 deletions(-)
```

### Commit 9: `e86eb00`
- **Commit SHA:** `e86eb000d5be127a457dd5a725e2067af28be8ef`
- **Previous SHA:** `ba582129fbc92d3daef29f59718a0dd837a7f563`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps): Bump @tanstack/react-query from 5.96.2 to 5.97.0 in the tanstack group (#155)

Bumps the tanstack group with 1 update:
[@tanstack/react-query](https://github.com/TanStack/query/tree/HEAD/packages/react-query).

Updates `@tanstack/react-query` from 5.96.2 to 5.97.0
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/TanStack/query/releases"><code>@​tanstack/react-query</code>'s
releases</a>.</em></p>
<blockquote>
<h2><code>@​tanstack/react-query-devtools</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-devtools</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query-next-experimental</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query-persist-client</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-persist-client-core</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies [<a
href="https://github.com/TanStack/query/commit/2bfb12cc44f1d8495106136e4ddacb817135f8f9"><code>2bfb12c</code></a>]:
<ul>
<li><code>@​tanstack/query-core</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
</ul>
</li>
</ul>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a
href="https://github.com/TanStack/query/blob/main/packages/react-query/CHANGELOG.md"><code>@​tanstack/react-query</code>'s
changelog</a>.</em></p>
<blockquote>
<h2>5.97.0</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies [<a
href="https://github.com/TanStack/query/commit/2bfb12cc44f1d8495106136e4ddacb817135f8f9"><code>2bfb12c</code></a>]:
<ul>
<li><code>@​tanstack/query-core</code><a
href="https://github.com/5"><code>@​5</code></a>.97.0</li>
</ul>
</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/TanStack/query/commit/125067c05adf6a8bfef14a34aa5b963bc885885d"><code>125067c</code></a>
ci: Version Packages (<a
href="https://github.com/TanStack/query/tree/HEAD/packages/react-query/issues/10436">#10436</a>)</li>
<li><a
href="https://github.com/TanStack/query/commit/f6991900dcd50367a3580d27f69ddfb6bd3a34f3"><code>f699190</code></a>
test(react-query): replace hardcoded query keys with 'queryKey()'
utility (<a
href="https://github.com/TanStack/query/tree/HEAD/packages/react-query/issues/1">#1</a>...</li>
<li><a
href="https://github.com/TanStack/query/commit/f3d3eea76b5f085650a62494ab72f351d70a0d6c"><code>f3d3eea</code></a>
test(*): replace deprecated 'toMatchTypeOf' with 'toExtend' (<a
href="https://github.com/TanStack/query/tree/HEAD/packages/react-query/issues/10413">#10413</a>)</li>
<li><a
href="https://github.com/TanStack/query/commit/3d6e001baeeef4e7c524f39cc009544aa05c2b08"><code>3d6e001</code></a>
test(react-query/useSuspenseQueries): replace 'async/await sleep' with
'sleep...</li>
<li><a
href="https://github.com/TanStack/query/commit/7d7a21c49c1c0d12e12a7da7ab00fa65df05650b"><code>7d7a21c</code></a>
test(react-query): replace 'async/await sleep' with 'sleep().then()' in
test ...</li>
<li>See full diff in <a
href="https://github.com/TanStack/query/commits/@tanstack/react-query@5.97.0/packages/react-query">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@tanstack/react-query&package-manager=npm_and_yarn&previous-version=5.96.2&new-version=5.97.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

Dependabot will resolve any conflicts with this PR as long as you don't
alter it yourself. You can also trigger a rebase manually by commenting
`@dependabot rebase`.

[//]: # (dependabot-automerge-start)
[//]: # (dependabot-automerge-end)

---

<details>
<summary>Dependabot commands and options</summary>
<br />

You can trigger Dependabot actions by commenting on this PR:
- `@dependabot rebase` will rebase this PR
- `@dependabot recreate` will recreate this PR, overwriting any edits
that have been made to it
- `@dependabot show <dependency name> ignore conditions` will show all
of the ignore conditions of the specified dependency
- `@dependabot ignore <dependency name> major version` will close this
group update PR and stop Dependabot creating any more for the specific
dependency's major version (unless you unignore this specific
dependency's major version or upgrade to it yourself)
- `@dependabot ignore <dependency name> minor version` will close this
group update PR and stop Dependabot creating any more for the specific
dependency's minor version (unless you unignore this specific
dependency's minor version or upgrade to it yourself)
- `@dependabot ignore <dependency name>` will close this group update PR
and stop Dependabot creating any more for the specific dependency
(unless you unignore this specific dependency or upgrade to it yourself)
- `@dependabot unignore <dependency name>` will remove all of the ignore
conditions of the specified dependency
- `@dependabot unignore <dependency name> <ignore condition>` will
remove the ignore condition of the specified dependency and ignore
conditions


</details>

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package-lock.json`
- `package.json`

#### Diff Summary
```text
e86eb000d build(deps): Bump @tanstack/react-query from 5.96.2 to 5.97.0 in the tanstack group (#155)
 package-lock.json | 16 ++++++++--------
 package.json      |  2 +-
 2 files changed, 9 insertions(+), 9 deletions(-)
```

### Commit 10: `c4d3e3f`
- **Commit SHA:** `c4d3e3f5de1e79047c9576cd971a49530ceabc12`
- **Previous SHA:** `e86eb000d5be127a457dd5a725e2067af28be8ef`
- **Date:** `2026-04-10`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump the vite group across 1 directory with 2 updates (#154)

Bumps the vite group with 2 updates in the / directory:
[vite](https://github.com/vitejs/vite/tree/HEAD/packages/vite) and
[vitest](https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest).

Updates `vite` from 8.0.7 to 8.0.8
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/vitejs/vite/releases">vite's
releases</a>.</em></p>
<blockquote>
<h2>v8.0.8</h2>
<p>Please refer to <a
href="https://github.com/vitejs/vite/blob/v8.0.8/packages/vite/CHANGELOG.md">CHANGELOG.md</a>
for details.</p>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a
href="https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md">vite's
changelog</a>.</em></p>
<blockquote>
<h2><!-- raw HTML omitted --><a
href="https://github.com/vitejs/vite/compare/v8.0.7...v8.0.8">8.0.8</a>
(2026-04-09)<!-- raw HTML omitted --></h2>
<h3>Features</h3>
<ul>
<li>update rolldown to 1.0.0-rc.15 (<a
href="https://redirect.github.com/vitejs/vite/issues/22201">#22201</a>)
(<a
href="https://github.com/vitejs/vite/commit/6baf587255936e91348cbe624caefd10e8c607ab">6baf587</a>)</li>
</ul>
<h3>Bug Fixes</h3>
<ul>
<li>avoid <code>dns.getDefaultResultOrder</code> temporary (<a
href="https://redirect.github.com/vitejs/vite/issues/22202">#22202</a>)
(<a
href="https://github.com/vitejs/vite/commit/15f1c15ac9be343ee4f317fd025c3d67f0c7bd53">15f1c15</a>)</li>
<li><strong>ssr:</strong> class property keys hoisting matching imports
(<a
href="https://redirect.github.com/vitejs/vite/issues/22199">#22199</a>)
(<a
href="https://github.com/vitejs/vite/commit/e1376018cd516d6970534fce495e24f9ee683ce3">e137601</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/vitejs/vite/commit/6e585dcb05a3b159fba7ae57f7faf0b1eca7a390"><code>6e585dc</code></a>
release: v8.0.8</li>
<li><a
href="https://github.com/vitejs/vite/commit/e1376018cd516d6970534fce495e24f9ee683ce3"><code>e137601</code></a>
fix(ssr): class property keys hoisting matching imports (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22199">#22199</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/15f1c15ac9be343ee4f317fd025c3d67f0c7bd53"><code>15f1c15</code></a>
fix: avoid <code>dns.getDefaultResultOrder</code> temporary (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22202">#22202</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/6baf587255936e91348cbe624caefd10e8c607ab"><code>6baf587</code></a>
feat: update rolldown to 1.0.0-rc.15 (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22201">#22201</a>)</li>
<li>See full diff in <a
href="https://github.com/vitejs/vite/commits/v8.0.8/packages/vite">compare
view</a></li>
</ul>
</details>
<br />

Updates `vitest` from 4.1.3 to 4.1.4
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/vitest-dev/vitest/releases">vitest's
releases</a>.</em></p>
<blockquote>
<h2>v4.1.4</h2>
<h3>   🚀 Experimental Features</h3>
<ul>
<li><strong>coverage</strong>:
<ul>
<li>Default to text reporter <code>skipFull</code> if agent detected  - 
by <a href="https://github.com/hi-ogawa"><code>@​hi-ogawa</code></a> in
<a
href="https://redirect.github.com/vitest-dev/vitest/issues/10018">vitest-dev/vitest#10018</a>
<a href="https://github.com/vitest-dev/vitest/commit/53757804c"><!-- raw
HTML omitted -->(53757)<!-- raw HTML omitted --></a></li>
</ul>
</li>
<li><strong>experimental</strong>:
<ul>
<li>Expose <code>assertion</code> as a public field  -  by <a
href="https://github.com/sheremet-va"><code>@​sheremet-va</code></a> in
<a
href="https://redirect.github.com/vitest-dev/vitest/issues/10095">vitest-dev/vitest#10095</a>
<a href="https://github.com/vitest-dev/vitest/commit/a120e3ab8"><!-- raw
HTML omitted -->(a120e)<!-- raw HTML omitted --></a></li>
<li>Support aria snapshot  -  by <a
href="https://github.com/hi-ogawa"><code>@​hi-ogawa</code></a>,
<strong>Claude Opus 4.6 (1M context)</strong>, <a
href="https://github.com/AriPerkkio"><code>@​AriPerkkio</code></a>,
<strong>Codex</strong> and <a
href="https://github.com/sheremet-va"><code>@​sheremet-va</code></a> in
<a
href="https://redirect.github.com/vitest-dev/vitest/issues/9668">vitest-dev/vitest#9668</a>
<a href="https://github.com/vitest-dev/vitest/commit/d4fbb5cc9"><!-- raw
HTML omitted -->(d4fbb)<!-- raw HTML omitted --></a></li>
</ul>
</li>
<li><strong>reporter</strong>:
<ul>
<li>Add filterMeta option to json reporter  -  by <a
href="https://github.com/nami8824"><code>@​nami8824</code></a> and <a
href="https://github.com/sheremet-va"><code>@​sheremet-va</code></a> in
<a
href="https://redirect.github.com/vitest-dev/vitest/issues/10078">vitest-dev/vitest#10078</a>
<a href="https://github.com/vitest-dev/vitest/commit/b77de968e"><!-- raw
HTML omitted -->(b77de)<!-- raw HTML omitted --></a></li>
</ul>
</li>
</ul>
<h3>   🐞 Bug Fixes</h3>
<ul>
<li>Use &quot;black&quot; foreground for labeled terminal message to
ensure contrast  -  by <a
href="https://github.com/hi-ogawa"><code>@​hi-ogawa</code></a> in <a
href="https://redirect.github.com/vitest-dev/vitest/issues/10076">vitest-dev/vitest#10076</a>
<a href="https://github.com/vitest-dev/vitest/commit/203f07af7"><!-- raw
HTML omitted -->(203f0)<!-- raw HTML omitted --></a></li>
<li>Make <code>expect(..., message)</code> consistent as error message
prefix  -  by <a
href="https://github.com/hi-ogawa"><code>@​hi-ogawa</code></a> and
<strong>Codex</strong> in <a
href="https://redirect.github.com/vitest-dev/vitest/issues/10068">vitest-dev/vitest#10068</a>
<a href="https://github.com/vitest-dev/vitest/commit/a1b5f0f4f"><!-- raw
HTML omitted -->(a1b5f)<!-- raw HTML omitted --></a></li>
<li>Do not hoist imports whose names match class properties .  -  by <a
href="https://github.com/SunsetFi"><code>@​SunsetFi</code></a> in <a
href="https://redirect.github.com/vitest-dev/vitest/issues/10093">vitest-dev/vitest#10093</a>
and <a
href="https://redirect.github.com/vitest-dev/vitest/issues/10094">vitest-dev/vitest#10094</a>
<a href="https://github.com/vitest-dev/vitest/commit/0fc4b47e0"><!-- raw
HTML omitted -->(0fc4b)<!-- raw HTML omitted --></a></li>
<li><strong>browser</strong>: Spread user server options into browser
Vite server in project  -  by <a
href="https://github.com/GoldStrikeArch"><code>@​GoldStrikeArch</code></a>
in <a
href="https://redirect.github.com/vitest-dev/vitest/issues/10049">vitest-dev/vitest#10049</a>
<a href="https://github.com/vitest-dev/vitest/commit/65c9d55eb"><!-- raw
HTML omitted -->(65c9d)<!-- raw HTML omitted --></a></li>
</ul>
<h5>    <a
href="https://github.com/vitest-dev/vitest/compare/v4.1.3...v4.1.4">View
changes on GitHub</a></h5>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/vitest-dev/vitest/commit/ac04bac206f49d793e7277084f707aee718aa936"><code>ac04bac</code></a>
chore: release v4.1.4</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/82c858d9435fac60bbc75b2af5c6e1e80914f5b6"><code>82c858d</code></a>
chore: Remove no-op function in plugin config logic (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/8501">#8501</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/d4fbb5cc931754d05327264baaf7b4364ed02f84"><code>d4fbb5c</code></a>
feat(experimental): support aria snapshot (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/9668">#9668</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/b77de968ecdc978e54d32926198f25a13bde9441"><code>b77de96</code></a>
feat(reporter): add filterMeta option to json reporter (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/10078">#10078</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/a120e3ab8bc0ab7baeb88ca9ef96a10d3ab5dbb3"><code>a120e3a</code></a>
feat(experimental): expose <code>assertion</code> as a public field (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/10095">#10095</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/53757804c0c291205ecd567cbf19f8d9beed24a0"><code>5375780</code></a>
feat(coverage): default to text reporter <code>skipFull</code> if agent
detected (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/10018">#10018</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/a1b5f0f4fbae863da441e413661fbdd9982b84e2"><code>a1b5f0f</code></a>
fix: make <code>expect(..., message)</code> consistent as error message
prefix (<a
href="https://github.com/vitest-dev/vitest/tree/HEAD/packages/vitest/issues/10068">#10068</a>)</li>
<li><a
href="https://github.com/vitest-dev/vitest/commit/203f07af789bc5b5c3cda8074f4ee116e280fa17"><code>203f07a</code></a>
fix: use &quot;black&quot; foreground for labeled terminal message to
ensure contrast (...</li>
<li>See full diff in <a
href="https://github.com/vitest-dev/vitest/commits/v4.1.4/packages/vitest">compare
view</a></li>
</ul>
</details>
<br />

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package-lock.json`
- `package.json`

#### Diff Summary
```text
c4d3e3f5d build(deps-dev): Bump the vite group across 1 directory with 2 updates (#154)
 package-lock.json | 279 ++++++++++++++++++++++++++----------------------------
 package.json      |   4 +-
 2 files changed, 136 insertions(+), 147 deletions(-)
```


## Evaluation Instructions
As Changelogger, independently inspect the code diffs for this batch by running `git show <sha>` or `git diff 2baa2542db676d524b53d509e156a194197f5143..c4d3e3f5de1e79047c9576cd971a49530ceabc12` in bash. If the clone is shallow (`git rev-parse --is-shallow-repository` returns `true`), run `git fetch --unshallow` first.

Synthesize the technical changes across all commits in this batch:
1. **Grouping / Merging**: Based on your judgment of the diffs, decide whether to group multiple commits into a single changelog entry or release version, split them into separate releases, or merge entries into a previous release header in `CHANGELOG-dexhelper.md`.
2. **Selective Inclusion**: Omit internal/trivial changes that do not warrant a user-facing or system maintainer changelog entry.
3. **Documentation**: Update `README.md` if any commit in the batch alters setup, features, or architecture.
4. **Link References**: If a changelog entry is added, include diff links (e.g. [`0.26.1...0.27.0`](https://github.com/${repo}/compare/2baa254...c4d3e3f)) and update link references at the bottom of `CHANGELOG-dexhelper.md`.
5. **No Changes Needed**: If no commits in the batch warrant changelog or README updates, submit an Empty PR.
