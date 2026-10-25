---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: READY
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-10-25'
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
rejection_reason: ''
confidence_score: 100
notes: >-
  Re-opened dynamically by changelog-engine.ts for each commit during repository
  history backfill.
---
# Changelog Backfill Batch Commit Evaluation

Target commit batch (10 commits) injected by `changelog-engine.ts`:

- **Batch Size:** 10
- **Primary Domain:** dexhelper
- **Suggested Overall SemVer Bump:** `major` (from `0.29.0` -> `1.0.0`)
- **Range:** `126e65d...0cc9b04`

## Commits in Batch

### Commit 1: `c805d46`
- **Commit SHA:** `c805d46515a939c3b4bbc62b8f362216484a8adb`
- **Previous SHA:** `126e65d7c93cc154473e9bebaca1e599c163f006`
- **Date:** `2026-04-15`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump @codecov/vite-plugin from 1.9.1 to 2.0.0 (#212)

Bumps @codecov/vite-plugin from 1.9.1 to 2.0.0.
<details>
<summary>Maintainer changes</summary>
<p>This version was pushed to npm by <a
href="https://www.npmjs.com/~thomasrockhu">thomasrockhu</a>, a new
releaser for <code>@​codecov/vite-plugin</code> since your current
version.</p>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@codecov/vite-plugin&package-manager=npm_and_yarn&previous-version=1.9.1&new-version=2.0.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `package.json`
- `pnpm-lock.yaml`

#### Diff Summary
```text
c805d4651 build(deps-dev): Bump @codecov/vite-plugin from 1.9.1 to 2.0.0 (#212)
 package.json   |  2 +-
 pnpm-lock.yaml | 18 +++++++++---------
 2 files changed, 10 insertions(+), 10 deletions(-)
```

### Commit 2: `2efc03f`
- **Commit SHA:** `2efc03f4f3a5451d1d56900f535db4bc12fc1bf6`
- **Previous SHA:** `c805d46515a939c3b4bbc62b8f362216484a8adb`
- **Date:** `2026-04-15`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: migrate map location script to TS and enforce strict type safety (#217)

## Summary
This PR completes the migration of the Map Locations generation script
to TypeScript and enables a stricter project configuration by disabling
JavaScript support in the source tree (`allowJs: false`).

## Changes
- **Migrated Script**: Ported `scripts/generateMapLocations.cjs` to
`scripts/generateMapLocations.ts`.
- **Infrastructure**: Added `data:gen-maps` script to `package.json` for
easy data generation.
- **TSConfig**: Removed `"allowJs": true` from `tsconfig.json`.
- **Type Safety**: Fixed various "implicit any" and "possibly undefined"
errors in scripts and core logic to align with `@tsconfig/strictest`.

## Memory Context (Memories)
- **Infrastructure (infrastructure/analysis_tools)**:
  - `allowJs` is now disabled.
- All source scripts are TypeScript and run with
`--experimental-strip-types`.
  - Stricter type checking is enforced across the board.
- **Migration Status (status/migration_summary_april_2026)**:
- Aligns with the "Offline-First" and "Lean Data" milestones by purging
more legacy JS patterns.
- Contributes to "Infrastructure Refinement" by hardening the data
generation pipeline.

## Verification
- `npm run data:gen-maps` succeeds and generates identical data.
- `pnpm type-check` passes project-wide.
```

#### Modified Files
- `.serena/memories/infrastructure/analysis_tools.md`
- `data/db/metadata.json`
- `package.json`
- `playwright.config.ts`
- `pnpm-lock.yaml`
- `scripts/generate-pokedata.ts`
- `scripts/generateMapLocations.cjs`
- `scripts/generateMapLocations.ts`
- `src/components/AssistantPanel.tsx`
- `src/components/PokedexCard.tsx`
- `src/components/assistant/AssistantSuggestionCard.tsx`
- `src/db/schema.ts`
- `src/engine/assistant/__tests__/fetchAssistantApiData.test.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/exclusives/gen1Exclusives.ts`
- `src/engine/saveParser/parsers/common.ts`
- `src/routes/__root.tsx`
- `src/routes/pokemon.$pokemonId.tsx`
- `tsconfig.json`
- `vite.config.ts`

#### Diff Summary
```text
2efc03f4f feat: migrate map location script to TS and enforce strict type safety (#217)
 .serena/memories/infrastructure/analysis_tools.md  |  5 ++
 data/db/metadata.json                              |  2 +-
 package.json                                       |  3 +
 playwright.config.ts                               | 13 ++--
 pnpm-lock.yaml                                     | 16 +++++
 scripts/generate-pokedata.ts                       | 13 ++--
 ...ateMapLocations.cjs => generateMapLocations.ts} | 79 ++++++++++++++--------
 src/components/AssistantPanel.tsx                  |  4 +-
 src/components/PokedexCard.tsx                     |  1 -
 .../assistant/AssistantSuggestionCard.tsx          |  2 +-
 src/db/schema.ts                                   | 12 ++--
 .../__tests__/fetchAssistantApiData.test.ts        |  6 +-
 src/engine/assistant/suggestionEngine.ts           |  9 ---
 src/engine/exclusives/gen1Exclusives.ts            |  1 +
 src/engine/saveParser/parsers/common.ts            | 24 ++++---
 src/routes/__root.tsx                              |  2 +-
 src/routes/pokemon.$pokemonId.tsx                  |  2 +-
 tsconfig.json                                      | 29 ++------
 vite.config.ts                                     | 19 +++---
 19 files changed, 130 insertions(+), 112 deletions(-)
```

### Commit 3: `24bc891`
- **Commit SHA:** `24bc89190789e2013b5bd1cec3aee538ab8ee7ee`
- **Previous SHA:** `2efc03f4f3a5451d1d56900f535db4bc12fc1bf6`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
chore: optimize vite build into monolithic architecture with vite 8 and lightningcss (#218)

## Summary
This PR optimizes the Vite build configuration to produce a monolithic,
offline-first bundle using **Vite 8**, **Rolldown**, and
**LightningCSS**.

### Key Changes
- **Monolithic Bundling**: Enforced a single JS and single CSS output
pair by disabling CSS splitting and forcing all manual chunks to
'index'.
- **LightningCSS Integration**: Migrated to LightningCSS for both CSS
transformation and minification, targeting `chrome130`.
- **Environment Stability**: Replaced `process.env` usage with
`import.meta.env` in `src/routes/__root.tsx` to resolve browser startup
errors.
- **Font Optimization**: Moved Google Font imports to HTML to avoid
build-time network request issues with LightningCSS while improving LCP.

### Verification
- `pnpm build` confirmed a single `index.js` and `style.css` output.
- All 37 E2E tests passed on Desktop and Mobile resolutions.
```

#### Modified Files
- `index.html`
- `metadata.json`
- `package.json`
- `pnpm-lock.yaml`
- `scripts/generate-pokedata.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/index.css`
- `src/routes/__root.tsx`
- `vite.config.ts`

#### Diff Summary
```text
24bc89190 chore: optimize vite build into monolithic architecture with vite 8 and lightningcss (#218)
 index.html                               |  3 ++
 metadata.json                            |  2 +-
 package.json                             |  2 ++
 pnpm-lock.yaml                           |  6 ++++
 scripts/generate-pokedata.ts             | 62 ++++++++++++++++----------------
 src/engine/assistant/suggestionEngine.ts |  4 ++-
 src/index.css                            |  1 -
 src/routes/__root.tsx                    |  2 +-
 vite.config.ts                           | 15 ++++++--
 9 files changed, 59 insertions(+), 38 deletions(-)
```

### Commit 4: `6c75f48`
- **Commit SHA:** `6c75f486c04668745f483b2556e8ca024be5b9e2`
- **Previous SHA:** `24bc89190789e2013b5bd1cec3aee538ab8ee7ee`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: integrate react query devtools (#223)

This pull request adds `@tanstack/react-query-devtools` as a development
dependency and lazy-loads it inside the `src/routes/__root.tsx` layout.
It's configured to only run in development mode, so it won't impact the
final production bundle size, while vastly improving developer
observability into cache reads/writes and query states. It avoids
loading in playwrite testing environments as well.

---
*PR created automatically by Jules for task
[9222016914553098504](https://jules.google.com/task/9222016914553098504)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `biome.jsonc`
- `package.json`
- `pnpm-lock.yaml`
- `src/routes/__root.tsx`

#### Diff Summary
```text
6c75f486c feat: integrate react query devtools (#223)
 biome.jsonc           |  2 +-
 package.json          |  1 +
 pnpm-lock.yaml        | 20 ++++++++++++++++++++
 src/routes/__root.tsx | 10 ++++++++++
 4 files changed, 32 insertions(+), 1 deletion(-)
```

### Commit 5: `cd44567`
- **Commit SHA:** `cd445673e30a95906b71753dec498276ee871583`
- **Previous SHA:** `6c75f486c04668745f483b2556e8ca024be5b9e2`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
🎨 Palette: Improve location suggestions UX and accessibility (#224)

💡 What: The clear location filter button icon was updated from a Search
icon to an X icon, added an aria-label, and applied consistent keyboard
focus rings to the location suggestion elements.
🎯 Why: The original "Search" icon for the clear action was confusing.
Furthermore, users navigating via keyboard could not see which location
suggestion they had focused, and the clear button lacked a
screen-reader-friendly label.
📸 Before/After: Verified via e2e automated screenshots showing the new X
icon and focus rings.
♿ Accessibility: Improved keyboard navigation by adding explicit
`focus-visible` ring utilities to mapped location suggestion buttons,
and improved screen reader context by adding an `aria-label` to the
clear button.

---
*PR created automatically by Jules for task
[13214246068418361609](https://jules.google.com/task/13214246068418361609)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.Jules/palette.md`
- `src/components/LocationSuggestions.tsx`

#### Diff Summary
```text
cd445673e 🎨 Palette: Improve location suggestions UX and accessibility (#224)
 .Jules/palette.md                      | 4 ++++
 src/components/LocationSuggestions.tsx | 9 +++++----
 2 files changed, 9 insertions(+), 4 deletions(-)
```

### Commit 6: `743cee3`
- **Commit SHA:** `743cee33dbfb0b352df72e66763397710847337a`
- **Previous SHA:** `cd445673e30a95906b71753dec498276ee871583`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: enable special strategy suggestions in assistant (#225)

Adds missing special suggestions (like PC box full warnings) to the
assistant feature by properly invoking the current generation's
AssistantStrategy.

---
*PR created automatically by Jules for task
[5681582306130220128](https://jules.google.com/task/5681582306130220128)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `src/engine/assistant/suggestionEngine.ts`

#### Diff Summary
```text
743cee33d feat: enable special strategy suggestions in assistant (#225)
 src/engine/assistant/suggestionEngine.ts | 4 ++++
 1 file changed, 4 insertions(+)
```

### Commit 7: `ef478c0`
- **Commit SHA:** `ef478c0615a823f84f42d770c5e6586281e63b33`
- **Previous SHA:** `fa2e24dc0199360c7695ced84f40d05cf8ebdd8b`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
build(deps): Bump actions/setup-node from 4 to 6 (#220)

Bumps [actions/setup-node](https://github.com/actions/setup-node) from 4
to 6.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/actions/setup-node/releases">actions/setup-node's
releases</a>.</em></p>
<blockquote>
<h2>v6.0.0</h2>
<h2>What's Changed</h2>
<p><strong>Breaking Changes</strong></p>
<ul>
<li>Limit automatic caching to npm, update workflows and documentation
by <a
href="https://github.com/priyagupta108"><code>@​priyagupta108</code></a>
in <a
href="https://redirect.github.com/actions/setup-node/pull/1374">actions/setup-node#1374</a></li>
</ul>
<p><strong>Dependency Upgrades</strong></p>
<ul>
<li>Upgrade ts-jest from 29.1.2 to 29.4.1 and document breaking changes
in v5 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1336">#1336</a></li>
<li>Upgrade prettier from 2.8.8 to 3.6.2 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1334">#1334</a></li>
<li>Upgrade actions/publish-action from 0.3.0 to 0.4.0 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1362">#1362</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a
href="https://github.com/actions/setup-node/compare/v5...v6.0.0">https://github.com/actions/setup-node/compare/v5...v6.0.0</a></p>
<h2>v5.0.0</h2>
<h2>What's Changed</h2>
<h3>Breaking Changes</h3>
<ul>
<li>Enhance caching in setup-node with automatic package manager
detection by <a
href="https://github.com/priya-kinthali"><code>@​priya-kinthali</code></a>
in <a
href="https://redirect.github.com/actions/setup-node/pull/1348">actions/setup-node#1348</a></li>
</ul>
<p>This update, introduces automatic caching when a valid
<code>packageManager</code> field is present in your
<code>package.json</code>. This aims to improve workflow performance and
make dependency management more seamless.
To disable this automatic caching, set <code>package-manager-cache:
false</code></p>
<pre lang="yaml"><code>steps:
- uses: actions/checkout@v5
- uses: actions/setup-node@v5
  with:
    package-manager-cache: false
</code></pre>
<ul>
<li>Upgrade action to use node24 by <a
href="https://github.com/salmanmkc"><code>@​salmanmkc</code></a> in <a
href="https://redirect.github.com/actions/setup-node/pull/1325">actions/setup-node#1325</a></li>
</ul>
<p>Make sure your runner is on version v2.327.1 or later to ensure
compatibility with this release. <a
href="https://github.com/actions/runner/releases/tag/v2.327.1">See
Release Notes</a></p>
<h3>Dependency Upgrades</h3>
<ul>
<li>Upgrade <code>@​octokit/request-error</code> and
<code>@​actions/github</code> by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1227">actions/setup-node#1227</a></li>
<li>Upgrade uuid from 9.0.1 to 11.1.0 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1273">actions/setup-node#1273</a></li>
<li>Upgrade undici from 5.28.5 to 5.29.0 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1295">actions/setup-node#1295</a></li>
<li>Upgrade form-data to bring in fix for critical vulnerability by <a
href="https://github.com/gowridurgad"><code>@​gowridurgad</code></a> in
<a
href="https://redirect.github.com/actions/setup-node/pull/1332">actions/setup-node#1332</a></li>
<li>Upgrade actions/checkout from 4 to 5 by <a
href="https://github.com/dependabot"><code>@​dependabot</code></a>[bot]
in <a
href="https://redirect.github.com/actions/setup-node/pull/1345">actions/setup-node#1345</a></li>
</ul>
<h2>New Contributors</h2>
<ul>
<li><a
href="https://github.com/priya-kinthali"><code>@​priya-kinthali</code></a>
made their first contribution in <a
href="https://redirect.github.com/actions/setup-node/pull/1348">actions/setup-node#1348</a></li>
<li><a href="https://github.com/salmanmkc"><code>@​salmanmkc</code></a>
made their first contribution in <a
href="https://redirect.github.com/actions/setup-node/pull/1325">actions/setup-node#1325</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a
href="https://github.com/actions/setup-node/compare/v4...v5.0.0">https://github.com/actions/setup-node/compare/v4...v5.0.0</a></p>
<h2>v4.4.0</h2>
<!-- raw HTML omitted -->
</blockquote>
<p>... (truncated)</p>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/actions/setup-node/commit/53b83947a5a98c8d113130e565377fae1a50d02f"><code>53b8394</code></a>
Bump minimatch from 3.1.2 to 3.1.5 (<a
href="https://redirect.github.com/actions/setup-node/issues/1498">#1498</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/54045abd5dcd3b0fee9ca02fa24c57545834c9cc"><code>54045ab</code></a>
Scope test lockfiles by package manager and update cache tests (<a
href="https://redirect.github.com/actions/setup-node/issues/1495">#1495</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/c882bffdbd4df51ace6b940023952e8669c9932a"><code>c882bff</code></a>
Replace uuid with crypto.randomUUID() (<a
href="https://redirect.github.com/actions/setup-node/issues/1378">#1378</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/774c1d62961e73038a114d59c8847023c003194d"><code>774c1d6</code></a>
feat(node-version-file): support parsing <code>devEngines</code> field
(<a
href="https://redirect.github.com/actions/setup-node/issues/1283">#1283</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/efcb663fc60e97218a2b2d6d827f7830f164739e"><code>efcb663</code></a>
fix: remove hardcoded bearer (<a
href="https://redirect.github.com/actions/setup-node/issues/1467">#1467</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/d02c89dce7e1ba9ef629ce0680989b3a1cc72edb"><code>d02c89d</code></a>
Fix npm audit issues (<a
href="https://redirect.github.com/actions/setup-node/issues/1491">#1491</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/6044e13b5dc448c55e2357c09f80417699197238"><code>6044e13</code></a>
Docs: bump actions/checkout from v5 to v6 (<a
href="https://redirect.github.com/actions/setup-node/issues/1468">#1468</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/8e494633d082d609d1e9ff931be32f8a44f1f657"><code>8e49463</code></a>
Fix README typo (<a
href="https://redirect.github.com/actions/setup-node/issues/1226">#1226</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/621ac41091d4227ef8fda5009c1ced96d8d36f7e"><code>621ac41</code></a>
README.md: bump to latest released checkout version v6 (<a
href="https://redirect.github.com/actions/setup-node/issues/1446">#1446</a>)</li>
<li><a
href="https://github.com/actions/setup-node/commit/2951748f4c016b747952f8ca7e75fc64f2f62b53"><code>2951748</code></a>
Bump <code>@​actions/cache</code> to v5.0.1 (<a
href="https://redirect.github.com/actions/setup-node/issues/1449">#1449</a>)</li>
<li>Additional commits viewable in <a
href="https://github.com/actions/setup-node/compare/v4...v6">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/setup-node&package-manager=github_actions&previous-version=4&new-version=6)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `.github/workflows/sync-pokedata.yml`

#### Diff Summary
```text
ef478c061 build(deps): Bump actions/setup-node from 4 to 6 (#220)
 .github/workflows/sync-pokedata.yml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Commit 8: `98ea107`
- **Commit SHA:** `98ea107463dc7ebeb542679b17dcfa2dab6e078e`
- **Previous SHA:** `ef478c0615a823f84f42d770c5e6586281e63b33`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
build(deps): Bump pnpm/action-setup from 3 to 6 (#221)

Bumps [pnpm/action-setup](https://github.com/pnpm/action-setup) from 3
to 6.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/pnpm/action-setup/releases">pnpm/action-setup's
releases</a>.</em></p>
<blockquote>
<h2>v6.0.0</h2>
<p>Added support for pnpm <a
href="https://github.com/pnpm/pnpm/releases/tag/v11.0.0-rc.0">v11</a>.</p>
<h2>v5.0.0</h2>
<p>Updated the action to use Node.js 24.</p>
<h2>v4.4.0</h2>
<p>Updated the action to use Node.js 24.</p>
<h2>v4.3.0</h2>
<h2>What's Changed</h2>
<ul>
<li>docs: fix the run_install example in the Readme by <a
href="https://github.com/dreyks"><code>@​dreyks</code></a> in <a
href="https://redirect.github.com/pnpm/action-setup/pull/175">pnpm/action-setup#175</a></li>
<li>chore: remove unused <code>@types/node-fetch</code> dependency by <a
href="https://github.com/silverwind"><code>@​silverwind</code></a> in <a
href="https://redirect.github.com/pnpm/action-setup/pull/186">pnpm/action-setup#186</a></li>
<li>Clarify that package_json_file is relative to GITHUB_WORKSPACE by <a
href="https://github.com/chris-martin"><code>@​chris-martin</code></a>
in <a
href="https://redirect.github.com/pnpm/action-setup/pull/184">pnpm/action-setup#184</a></li>
<li>feat: store caching by <a
href="https://github.com/jrmajor"><code>@​jrmajor</code></a> in <a
href="https://redirect.github.com/pnpm/action-setup/pull/188">pnpm/action-setup#188</a></li>
<li>refactor: remove star imports by <a
href="https://github.com/KSXGitHub"><code>@​KSXGitHub</code></a> in <a
href="https://redirect.github.com/pnpm/action-setup/pull/196">pnpm/action-setup#196</a></li>
<li>fix(ci): exclude macos by <a
href="https://github.com/KSXGitHub"><code>@​KSXGitHub</code></a> in <a
href="https://redirect.github.com/pnpm/action-setup/pull/197">pnpm/action-setup#197</a></li>
</ul>
<h2>New Contributors</h2>
<ul>
<li><a href="https://github.com/dreyks"><code>@​dreyks</code></a> made
their first contribution in <a
href="https://redirect.github.com/pnpm/action-setup/pull/175">pnpm/action-setup#175</a></li>
<li><a
href="https://github.com/silverwind"><code>@​silverwind</code></a> made
their first contribution in <a
href="https://redirect.github.com/pnpm/action-setup/pull/186">pnpm/action-setup#186</a></li>
<li><a
href="https://github.com/chris-martin"><code>@​chris-martin</code></a>
made their first contribution in <a
href="https://redirect.github.com/pnpm/action-setup/pull/184">pnpm/action-setup#184</a></li>
<li><a href="https://github.com/jrmajor"><code>@​jrmajor</code></a> made
their first contribution in <a
href="https://redirect.github.com/pnpm/action-setup/pull/188">pnpm/action-setup#188</a></li>
<li><a
href="https://github.com/Boosted-Bonobo"><code>@​Boosted-Bonobo</code></a>
made their first contribution in <a
href="https://redirect.github.com/pnpm/action-setup/pull/199">pnpm/action-setup#199</a></li>
</ul>
<p><strong>Full Changelog</strong>: <a
href="https://github.com/pnpm/action-setup/compare/v4.2.0...v4.3.0">https://github.com/pnpm/action-setup/compare/v4.2.0...v4.3.0</a></p>
<h2>v4.2.0</h2>
<p>When there's a <code>.npmrc</code> file at the root of the
repository, pnpm will be fetched from the registry that is specified in
that <code>.npmrc</code> file <a
href="https://redirect.github.com/pnpm/action-setup/pull/179">#179</a></p>
<h2>v4.1.0</h2>
<p>Add support for <code>package.yaml</code> <a
href="https://redirect.github.com/pnpm/action-setup/pull/156">#156</a>.</p>
<h2>v4.0.0</h2>
<p>An error is thrown if one version of pnpm is specified in the
<code>packageManager</code> field of <code>package.json</code> and a
different version is specified in the action's settings <a
href="https://redirect.github.com/pnpm/action-setup/pull/122">#122</a></p>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/pnpm/action-setup/commit/08c4be7e2e672a47d11bd04269e27e5f3e8529cb"><code>08c4be7</code></a>
docs(README): update action-setup version</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/579891461a117d7c030d0430bbc772562374d9e1"><code>5798914</code></a>
chore: update .gitignore</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/ddffd667542d33325b6f1d9bda9cfcc7861fc400"><code>ddffd66</code></a>
fix: remove accidentally committed file</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/b43f991918ce53332dce4c15c32ae14261d12d65"><code>b43f991</code></a>
fix: update pnpm to 11.0.0-rc.0</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/3852509c9e55070b5aac70d0500b8772d13ed4e6"><code>3852509</code></a>
README.md: bring versions up-to-date (<a
href="https://redirect.github.com/pnpm/action-setup/issues/222">#222</a>)</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/6e7bdbda5fe05107efc88b23b7ed00aa05f84ca0"><code>6e7bdbd</code></a>
chore: bump bootstrap pnpm to 11.0.0-beta.4-1 and add update script</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/6b87c4621a21f802115d27ffcbfb44e28abd1387"><code>6b87c46</code></a>
fix: Windows standalone mode — bypass broken npm shims (<a
href="https://redirect.github.com/pnpm/action-setup/issues/217">#217</a>)</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/994d756a33d64d79175a2d721a1a1b6976958b2d"><code>994d756</code></a>
feat: read pnpm version from devEngines.packageManager (<a
href="https://redirect.github.com/pnpm/action-setup/issues/211">#211</a>)</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/738f428026a1f5a72398de22aeed83d859c4a660"><code>738f428</code></a>
docs: upgrade pnpm/action-setup from v4 to v5</li>
<li><a
href="https://github.com/pnpm/action-setup/commit/62bce642757454630341df504b8b9ee51f1332da"><code>62bce64</code></a>
fix: extract pnpm version from packageManager field instead of returning
unde...</li>
<li>Additional commits viewable in <a
href="https://github.com/pnpm/action-setup/compare/v3.0.0...v6">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=pnpm/action-setup&package-manager=github_actions&previous-version=3&new-version=6)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `.github/workflows/sync-pokedata.yml`

#### Diff Summary
```text
98ea10746 build(deps): Bump pnpm/action-setup from 3 to 6 (#221)
 .github/workflows/sync-pokedata.yml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Commit 9: `c15cc81`
- **Commit SHA:** `c15cc81f33e510b35a6f4aaeb247da966cd0d0a6`
- **Previous SHA:** `98ea107463dc7ebeb542679b17dcfa2dab6e078e`
- **Date:** `2026-04-16`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: unified location architecture and precomputed distances (#226)

# Unified Location Architecture & Precomputed Distances

This PR finalizes the refactoring of the location data architecture,
moving from runtime graph traversal to O(1) distance lookups via
precomputed build-time matrices.

## Key Changes

### 1. Database Consolidation
- Unified `locations`, `areas`, and `locationIndex` into a single
`UnifiedLocation` schema.
- Bumped database version to **7**, triggering a full client-side
synchronization.
- Removed obsolete stores (`AREAS`, `INDEX`) to streamline the data
model.

### 2. Build-Time Distance Computation
- Updated `scripts/generate-pokedata.ts` to implement the Floyd-Warshall
algorithm (APSP).
- Precomputes distance matrices for every location in Gen 1 and Gen 2.
- Integrated Johto (Gen 2) map connection data to support cross-game
navigation logic.

### 3. Optimized Map Graph Engine
- Refactored `src/engine/mapGraph/gen1Graph.ts` to utilize the
precomputed `dist` matrices.
- Significantly reduced runtime complexity from $O(V+E)$ to $O(1)$.
- Improved indoor-to-parent resolution logic to ensure buildings
correctly inherit the distance profile of their outdoor parent area.

### 4. Verified Stability
- Updated all unit tests in `PokeDB.test.ts`, `gen1Graph.test.ts`, and
`gen1Strategy.test.ts`.
- Full E2E test suite passing with high-fidelity validation of the
assistant suggestions.

## Implementation Details
- **Schema:** `UnifiedLocation` now holds `connections`, `pids`, and
`dist`.
- **Generation:** Floyd-Warshall is applied separately to Gen 1 and Gen
2 graphs during the build pipeline.
- **Sync:** The database now syncs a single consolidated `locations`
store instead of managing multiple indices.

**Verification Status:**
- Unit Tests: ✅ Passed
- E2E Tests: ✅ Passed (37/37)
```

#### Modified Files
- `.serena/memories/architecture/locations/unified-v7.md`
- `data/db/areas.jsonl`
- `data/db/location_index.jsonl`
- `data/db/locations.jsonl`
- `data/db/metadata.json`
- `scripts/data/gen2/mapping.ts`
- `scripts/generate-pokedata.ts`
- `src/db/PokeDB.ts`
- `src/db/__tests__/PokeDB.test.ts`
- `src/db/schema.ts`
- `src/engine/assistant/__tests__/gen1Strategy.test.ts`
- `src/engine/assistant/strategies/gen1Strategy.ts`
- `src/engine/assistant/strategies/types.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/mapGraph/gen1Graph.test.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/mapGraph/index.ts`
- `src/engine/mapGraph/types.ts`
- `vite-plugins/pokedata-plugin.ts`

#### Diff Summary
```text
c15cc81f3 feat: unified location architecture and precomputed distances (#226)
 .../memories/architecture/locations/unified-v7.md  |  11 ++
 data/db/areas.jsonl                                |  76 -----------
 data/db/location_index.jsonl                       |  76 -----------
 data/db/locations.jsonl                            | 152 ++++++++++-----------
 data/db/metadata.json                              |   2 +-
 scripts/data/gen2/mapping.ts                       | 111 +++++++--------
 scripts/generate-pokedata.ts                       | 133 +++++++++++++-----
 src/db/PokeDB.ts                                   |  61 +++------
 src/db/__tests__/PokeDB.test.ts                    |  25 ++--
 src/db/schema.ts                                   |  36 ++---
 .../assistant/__tests__/gen1Strategy.test.ts       |  34 ++---
 src/engine/assistant/strategies/gen1Strategy.ts    |  17 +--
 src/engine/assistant/strategies/types.ts           |   7 +-
 src/engine/assistant/suggestionEngine.ts           |  14 +-
 src/engine/mapGraph/gen1Graph.test.ts              |  51 ++++---
 src/engine/mapGraph/gen1Graph.ts                   |  64 ++-------
 src/engine/mapGraph/index.ts                       |   9 +-
 src/engine/mapGraph/types.ts                       |  11 +-
 vite-plugins/pokedata-plugin.ts                    |   4 -
 19 files changed, 358 insertions(+), 536 deletions(-)
```

### Commit 10: `0cc9b04`
- **Commit SHA:** `0cc9b04ea95a8bef34b11fcb70a6b37078bd6454`
- **Previous SHA:** `693136818cc0b4b643bdad2ecfbb9a950a68aee2`
- **Date:** `2026-04-17`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
Optimize PokeDB Data Storage & Refactor Inflation (#227)

## Overview
This PR optimizes the application's data layer by omitting redundant
default values during build-time generation and restoring them at
runtime via recursive inflation. It also stabilizes the E2E test suite
by resolving hydration crashes and fixing strict mode violations in
location lookups.

### Changes
- **Data Architecture**:
- Updated build-time generation to omit field defaults (`tr`, `gr`,
`mh`) and redundant level ranges.
- Implemented **recursive inflation** in `PokeDB.ts` for nested
evolution chains (`eto`) and encounter details.
  - Added robust null/default checks to prevent hydration crashes.
- **UI & Stabilization**:
- Implemented **generation-based filtering** for pre-evolutions (e.g.,
Pichu) to prevent duplicate headings in legacy views.
- Added `data-testid` attributes to `Evolution` and `Location` sections
for stable E2E selectors.
- Updated E2E locators in `pokemon-details.spec.ts` to use exact text
matches for route names (fixing collisions between `ROUTE 1` and `ROUTE
11`).
- **Schema**: Bumped DB version to `9` to force hydration refresh.

### Impact
- Improved data efficiency by stripping redundant field defaults.
- 100% E2E test pass rate (7/7 tests stable across Desktop and Mobile).

### Verification
- `pnpm test`: 128 Unit tests passed.
- `pnpm test:e2e`: Verified across Desktop FullHD, 1440p, and Mobile
Pixel 9.
```

#### Modified Files
- `.serena/memories/db/serialization_analysis_2026.md`
- `data/db/encounters.jsonl`
- `data/db/locations.jsonl`
- `data/db/metadata.json`
- `data/db/pokemon.jsonl`
- `scripts/generate-pokedata.ts`
- `src/components/AssistantPanel.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/pokemon/details/PokemonEvolutions.tsx`
- `src/components/pokemon/details/PokemonLocations.tsx`
- `src/db/DexDataLoader.ts`
- `src/db/PokeDB.ts`
- `src/db/__tests__/DexDataLoader.test.ts`
- `src/db/__tests__/PokeDB.test.ts`
- `src/db/schema.ts`
- `src/engine/assistant/__tests__/fetchAssistantApiData.test.ts`
- `src/engine/assistant/__tests__/gen1Strategy.test.ts`
- `src/engine/assistant/__tests__/suggestionEngine.fix.test.ts`
- `src/engine/assistant/__tests__/test-coverage.test.ts`
- `src/engine/assistant/strategies/gen1Strategy.ts`
- `src/engine/assistant/strategies/types.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/mapGraph/gen1Graph.test.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/mapGraph/types.ts`
- `src/hooks/useAssistant.test.ts`
- `src/routes/pokemon.$pokemonId.tsx`
- `tests/e2e/pokemon-details.spec.ts`
- `tests/e2e/test-utils.ts`
- `vite-plugins/pokedata-plugin.ts`

#### Diff Summary
```text
0cc9b04ea Optimize PokeDB Data Storage & Refactor Inflation (#227)
 .serena/memories/db/serialization_analysis_2026.md |   9 +
 data/db/encounters.jsonl                           | 294 ++++++------
 data/db/locations.jsonl                            | 152 +++----
 data/db/metadata.json                              |   2 +-
 data/db/pokemon.jsonl                              | 502 ++++++++++-----------
 scripts/generate-pokedata.ts                       | 278 +++++++-----
 src/components/AssistantPanel.tsx                  |   2 +
 src/components/PokemonDetails.tsx                  |  21 +-
 .../pokemon/details/PokemonEvolutions.tsx          |   4 +-
 .../pokemon/details/PokemonLocations.tsx           |   2 +-
 src/db/DexDataLoader.ts                            |  12 +-
 src/db/PokeDB.ts                                   |  71 ++-
 src/db/__tests__/DexDataLoader.test.ts             |  10 +-
 src/db/__tests__/PokeDB.test.ts                    |  42 +-
 src/db/schema.ts                                   |  42 +-
 .../__tests__/fetchAssistantApiData.test.ts        |   4 +-
 .../assistant/__tests__/gen1Strategy.test.ts       |   8 +-
 .../__tests__/suggestionEngine.fix.test.ts         |  26 +-
 .../assistant/__tests__/test-coverage.test.ts      |  48 +-
 src/engine/assistant/strategies/gen1Strategy.ts    |   4 +-
 src/engine/assistant/strategies/types.ts           |   2 +-
 src/engine/assistant/suggestionEngine.ts           |  16 +-
 src/engine/mapGraph/gen1Graph.test.ts              |  12 +-
 src/engine/mapGraph/gen1Graph.ts                   |   4 +-
 src/engine/mapGraph/types.ts                       |   2 +-
 src/hooks/useAssistant.test.ts                     |  65 ++-
 src/routes/pokemon.$pokemonId.tsx                  |   1 +
 tests/e2e/pokemon-details.spec.ts                  |   5 +-
 tests/e2e/test-utils.ts                            |  34 +-
 vite-plugins/pokedata-plugin.ts                    |   6 +-
 30 files changed, 913 insertions(+), 767 deletions(-)
```


## Evaluation Instructions
As Changelogger, independently inspect the code diffs for this batch by running `git show <sha>` or `git diff 126e65d7c93cc154473e9bebaca1e599c163f006..0cc9b04ea95a8bef34b11fcb70a6b37078bd6454` in bash. If the clone is shallow (`git rev-parse --is-shallow-repository` returns `true`), run `git fetch --unshallow` first.

Synthesize the technical changes across all commits in this batch:
1. **Grouping / Merging**: Based on your judgment of the diffs, decide whether to group multiple commits into a single changelog entry or release version, split them into separate releases, or merge entries into a previous release header in `CHANGELOG-dexhelper.md`.
2. **Selective Inclusion**: Omit internal/trivial changes that do not warrant a user-facing or system maintainer changelog entry.
3. **Documentation**: Update `README.md` if any commit in the batch alters setup, features, or architecture.
4. **Link References**: If a changelog entry is added, include diff links (e.g. [`0.29.0...1.0.0`](https://github.com/${repo}/compare/126e65d...0cc9b04)) and update link references at the bottom of `CHANGELOG-dexhelper.md`.
5. **No Changes Needed**: If no commits in the batch warrant changelog or README updates, submit an Empty PR.
