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
- **Suggested Overall SemVer Bump:** `minor` (from `0.28.0` -> `0.29.0`)
- **Range:** `1cf13ad...126e65d`

## Commits in Batch

### Commit 1: `49684a8`
- **Commit SHA:** `49684a8f945b18922e6aed1ac902f39b0c2e9437`
- **Previous SHA:** `1cf13ad37fddbdb3d46ab5f515a02c5c8614b28a`
- **Date:** `2026-04-12`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
refactor: remove redundant file paths from CI workflows, update accessibility documentation, and add agent schedule definitions
```

#### Modified Files
- `.github/workflows/ci.yml`
- `.jules/palette.md`
- `.jules/schedules/bolt.md`
- `.jules/schedules/infras.md`
- `.jules/schedules/palette.md`
- `.jules/schedules/trainer.md`
- `playwright.config.ts`

#### Diff Summary
```text
49684a8f9 refactor: remove redundant file paths from CI workflows, update accessibility documentation, and add agent schedule definitions
 .github/workflows/ci.yml    |   2 -
 .jules/palette.md           |  20 +++++
 .jules/schedules/bolt.md    | 146 +++++++++++++++++++++++++++++++++
 .jules/schedules/infras.md  |   7 ++
 .jules/schedules/palette.md | 192 ++++++++++++++++++++++++++++++++++++++++++++
 .jules/schedules/trainer.md |   6 ++
 playwright.config.ts        |   8 +-
 7 files changed, 375 insertions(+), 6 deletions(-)
```

### Commit 2: `8f5a015`
- **Commit SHA:** `8f5a01507a2eaa6a7de35cbd069f12a67eb3caed`
- **Previous SHA:** `49684a8f945b18922e6aed1ac902f39b0c2e9437`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
⚡ Bolt: [performance improvement] Pre-compute pokemon mapping in StorageGrid to avoid render-time Map lookups (#181)

💡 **What:** 
Refactored `StorageGrid.tsx` to enrich `pokemonByLocation` array with
the mapped `pokemon` instance directly inside its `useMemo` block.

🎯 **Why:** 
Previously, the `StorageGrid` was doing a `pokemonMap.get(p.speciesId)`
lookup during the actual JSX render pass. For a user with a full storage
box, this resulted in hundreds of Map lookups being needlessly executed
on every single component render instead of being tied strictly to state
updates.

📊 **Measured Improvement:** 
Created `tests/benchmarks/storageGrid.bench.ts` with a mock rendering
loop simulation:
- **Baseline Render Loop (Map.get per render)**: ~154,782 ops/sec
- **Proposed Pre-combined Render Loop**: ~446,537 ops/sec
- **Result**: ~2.88x faster iteration through the nested array when the
data is pre-joined.

---
*PR created automatically by Jules for task
[9483217003696483570](https://jules.google.com/task/9483217003696483570)
started by @szubster*

---------

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `src/components/StorageGrid.tsx`

#### Diff Summary
```text
8f5a01507 ⚡ Bolt: [performance improvement] Pre-compute pokemon mapping in StorageGrid to avoid render-time Map lookups (#181)
 src/components/StorageGrid.tsx | 14 +++++++-------
 1 file changed, 7 insertions(+), 7 deletions(-)
```

### Commit 3: `af6b7df`
- **Commit SHA:** `af6b7df32d803a7cd2e2a09db9633157c9c0882c`
- **Previous SHA:** `8f5a01507a2eaa6a7de35cbd069f12a67eb3caed`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
build(deps): Bump pnpm/action-setup from 4 to 6 (#192)

Bumps [pnpm/action-setup](https://github.com/pnpm/action-setup) from 4
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
href="https://github.com/pnpm/action-setup/compare/v4...v6">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=pnpm/action-setup&package-manager=github_actions&previous-version=4&new-version=6)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/playwright.yml`

#### Diff Summary
```text
af6b7df32 build(deps): Bump pnpm/action-setup from 4 to 6 (#192)
 .github/workflows/ci.yml         | 2 +-
 .github/workflows/deploy.yml     | 2 +-
 .github/workflows/playwright.yml | 2 +-
 3 files changed, 3 insertions(+), 3 deletions(-)
```

### Commit 4: `5dc3bf8`
- **Commit SHA:** `5dc3bf8607bc95f6535c61f8e0a7d10fea66e42d`
- **Previous SHA:** `6dbb52145fd6468ded9d3750b035367cd62a0b5e`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
🎨 Palette: Add aria-labels to icon-only and card buttons (#195)

### 💡 What
Added `aria-label` attributes to icon-only buttons and interactive cards
throughout the application, specifically targeting the Debug Toggle in
the Assistant Panel, the Pokedex Cards, and the Storage Grid Cards.

### 🎯 Why
Icon-only buttons and interactive elements that lack clear text content
are inaccessible to screen readers. While some had `title` attributes,
these are often insufficient or completely ignored by assistive
technologies. Adding descriptive `aria-label`s ensures that all users,
regardless of how they navigate the app, understand the purpose and
destination of these interactions.

### 📸 Before/After
*(No visual changes - purely an accessibility enhancement)*

### ♿ Accessibility
- Added `aria-label="Toggle Debug Mode"` to the Assistant Panel debug
toggle button.
- Added `aria-label={"View details for " + pokemon.name}` to Pokedex
Grid cards.
- Added `aria-label={"View details for " + pokemon.name + " in " +
location}` to Storage Grid cards.
- Screen readers will now announce the specific action or Pokémon
destination when focusing on these interactive elements.

---
*PR created automatically by Jules for task
[3149457879431187405](https://jules.google.com/task/3149457879431187405)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.Jules/palette.md`
- `src/components/AssistantPanel.tsx`
- `src/components/PokedexCard.tsx`
- `src/components/StorageGrid.tsx`

#### Diff Summary
```text
5dc3bf860 🎨 Palette: Add aria-labels to icon-only and card buttons (#195)
 .Jules/palette.md                 | 3 +++
 src/components/AssistantPanel.tsx | 1 +
 src/components/PokedexCard.tsx    | 1 +
 src/components/StorageGrid.tsx    | 1 +
 4 files changed, 6 insertions(+)
```

### Commit 5: `afa32a7`
- **Commit SHA:** `afa32a7ff14ad2ca29fa68ea497f3244b858a855`
- **Previous SHA:** `5dc3bf8607bc95f6535c61f8e0a7d10fea66e42d`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
Fix Red/Blue starter catchable logic in suggestion engine (#196)

I have identified and fixed a logic bug in
`src/engine/assistant/suggestionEngine.ts` where Red/Blue starter
Pokémon were incorrectly being marked as catchable in Red and Blue
versions instead of correctly being marked as version exclusive
(requiring a trade). The condition evaluating `isInternalObtainable` had
a tautology with its fallback `else if` branch.

**What:**
Fixed the version exclusivity logic for Red/Blue starters inside
`suggestionEngine.ts`.

**Why:**
The previous code used an `else if (isInternalObtainable)` fallback
inside an `if (isInternalObtainable)` block. This caused Red/Blue
starters (which are in the `isInternalObtainable` list) to fall through
and incorrectly be marked as `isCatchableSomewhere = true` in Red and
Blue, which led to missing trade suggestions for these starters.

**Verification:**
Manually tested the condition logic via isolated scratch scripts to
verify the bug, and ran the full unit test suite via `npx vitest run` to
ensure no regressions. All tests pass successfully.

---
*PR created automatically by Jules for task
[5522864603245360215](https://jules.google.com/task/5522864603245360215)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `src/engine/assistant/suggestionEngine.ts`

#### Diff Summary
```text
afa32a7ff Fix Red/Blue starter catchable logic in suggestion engine (#196)
 src/engine/assistant/suggestionEngine.ts | 7 +++++--
 1 file changed, 5 insertions(+), 2 deletions(-)
```

### Commit 6: `12a4801`
- **Commit SHA:** `12a480145f804496b2da5103ead076e8c118a14e`
- **Previous SHA:** `afa32a7ff14ad2ca29fa68ea497f3244b858a855`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
⚡ Bolt: Add React.memo to PokedexCard (#197)

💡 **What:** 
Wrapped the `PokedexCard` component in `React.memo()`.

🎯 **Why:** 
When the user types in the search filter, the parent `PokedexGrid`
re-renders and re-evaluates `finalPokemon`. Without `React.memo`, this
forces React to re-render all visible `PokedexCard` components (up to
251 for Gen 2), even though their individual props (like `saveData`,
`pokemon`, `genConfig`) haven't changed. This causes significant main
thread blocking and typing jank.

📊 **Impact:** 
Significantly reduces main thread blocking time during list filtering by
completely skipping the reconciliation process for up to 251 list items
whose props have not changed. This results in much smoother typing in
the search bar.

🔬 **Measurement:** 
Run the app, type rapidly in the search bar. Using React DevTools
Profiler, observe that `PokedexCard` components no longer render when
typing.

---
*PR created automatically by Jules for task
[7613306447075836344](https://jules.google.com/task/7613306447075836344)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.jules/bolt.md`
- `src/components/PokedexCard.tsx`

#### Diff Summary
```text
12a480145 ⚡ Bolt: Add React.memo to PokedexCard (#197)
 .jules/bolt.md                 | 4 ++++
 src/components/PokedexCard.tsx | 7 +++++--
 2 files changed, 9 insertions(+), 2 deletions(-)
```

### Commit 7: `c307662`
- **Commit SHA:** `c307662076481fbec5eec66facf7477f6d829f92`
- **Previous SHA:** `12a480145f804496b2da5103ead076e8c118a14e`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
build(deps): Bump actions/upload-pages-artifact from 4 to 5 (#200)

Bumps
[actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)
from 4 to 5.
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/actions/upload-pages-artifact/releases">actions/upload-pages-artifact's
releases</a>.</em></p>
<blockquote>
<h2>v5.0.0</h2>
<h1>Changelog</h1>
<ul>
<li>Update upload-artifact action to version 7 <a
href="https://github.com/Tom-van-Woudenberg"><code>@​Tom-van-Woudenberg</code></a>
(<a
href="https://redirect.github.com/actions/upload-pages-artifact/issues/139">#139</a>)</li>
<li>feat: add <code>include-hidden-files</code> input <a
href="https://github.com/jonchurch"><code>@​jonchurch</code></a> (<a
href="https://redirect.github.com/actions/upload-pages-artifact/issues/137">#137</a>)</li>
</ul>
<p>See details of <a
href="https://github.com/actions/upload-pages-artifact/compare/v4.0.0...v4.0.1">all
code changes</a> since previous release.</p>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/fc324d3547104276b827a68afc52ff2a11cc49c9"><code>fc324d3</code></a>
Merge pull request <a
href="https://redirect.github.com/actions/upload-pages-artifact/issues/139">#139</a>
from Tom-van-Woudenberg/patch-1</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/fe9d4b7d84090e1d8d9c53a0236f810d4e00d2c3"><code>fe9d4b7</code></a>
Merge branch 'main' into patch-1</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/0ca16172ca884f0a37117fed41734f29784cc980"><code>0ca1617</code></a>
Merge pull request <a
href="https://redirect.github.com/actions/upload-pages-artifact/issues/137">#137</a>
from jonchurch/include-hidden-files</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/57f0e8492b437b7818227931fef2faa1a379839b"><code>57f0e84</code></a>
Update action.yml</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/4a90348b2933470dc78cec55534259872a6d3c0d"><code>4a90348</code></a>
v7 --&gt; hash</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/56f665a6f297fa95f8d735b314187fb2d7764569"><code>56f665a</code></a>
Update upload-artifact action to version 7</li>
<li><a
href="https://github.com/actions/upload-pages-artifact/commit/f7615f5917213b24245d49ba96693d0f5375a414"><code>f7615f5</code></a>
Add <code>include-hidden-files</code> input</li>
<li>See full diff in <a
href="https://github.com/actions/upload-pages-artifact/compare/v4...v5">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=actions/upload-pages-artifact&package-manager=github_actions&previous-version=4&new-version=5)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `.github/workflows/deploy.yml`

#### Diff Summary
```text
c30766207 build(deps): Bump actions/upload-pages-artifact from 4 to 5 (#200)
 .github/workflows/deploy.yml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### Commit 8: `856f3c5`
- **Commit SHA:** `856f3c5587eacd91d16973e4f2a46504c267727e`
- **Previous SHA:** `b0f6ed716cebc4f35aab42a3be161ff8aae9e578`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
🧹 [code health improvement] Refactor saveParser/index.ts into modular files (#191)

🎯 **What:**
The monolithic `src/engine/saveParser/index.ts` file (~1,000 lines) was
broken down into smaller, modular files within a new
`src/engine/saveParser/parsers/` directory. The parsing logic is now
separated logically into `common.ts`, `gen1.ts`, and `gen2.ts`.

💡 **Why:**
Parsing logic is complex and distinct between Gen 1 and Gen 2. By
separating these into their own files, the codebase becomes
significantly easier to read, maintain, and test. It isolates
generation-specific logic from generic file reading and generation
detection logic.

✅ **Verification:**
- Ran `npx tsc --noEmit` and `npx biome check .` to confirm proper
imports and formatting.
- Verified that all unit tests (`npx vitest run`) pass perfectly without
modifications to the actual mock data tests, ensuring that the exact
original behaviors (like checksum logic and fallback heuristics) remain
intact.
- Confirmed `index.ts` correctly acts as a facade, re-exporting the
required types and objects (`INTERNAL_ID_TO_DEX`) so external
dependencies are not broken.

✨ **Result:**
The main entry point file is now much cleaner (~50 lines), and the core
parsing functions are logically separated by generation, significantly
improving the maintainability of the project's save parsing system.

---
*PR created automatically by Jules for task
[11302690866529034997](https://jules.google.com/task/11302690866529034997)
started by @szubster*

---------

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `plan.md`
- `src/engine/saveParser/index.ts`
- `src/engine/saveParser/parsers/common.ts`
- `src/engine/saveParser/parsers/gen1.test.ts`
- `src/engine/saveParser/parsers/gen1.ts`
- `src/engine/saveParser/parsers/gen2.test.ts`
- `src/engine/saveParser/parsers/gen2.ts`

#### Diff Summary
```text
856f3c558 🧹 [code health improvement] Refactor saveParser/index.ts into modular files (#191)
 plan.md                                    |   8 -
 src/engine/saveParser/index.ts             | 938 +----------------------------
 src/engine/saveParser/parsers/common.ts    | 157 +++++
 src/engine/saveParser/parsers/gen1.test.ts |  82 +++
 src/engine/saveParser/parsers/gen1.ts      | 444 ++++++++++++++
 src/engine/saveParser/parsers/gen2.test.ts | 144 +++++
 src/engine/saveParser/parsers/gen2.ts      | 334 ++++++++++
 7 files changed, 1167 insertions(+), 940 deletions(-)
```

### Commit 9: `5bf5818`
- **Commit SHA:** `5bf5818769f450c22a92a4942658a377e9928fd4`
- **Previous SHA:** `856f3c5587eacd91d16973e4f2a46504c267727e`
- **Date:** `2026-04-14`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump @types/node from 25.5.2 to 25.6.0 (#194)

Bumps
[@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/node)
from 25.5.2 to 25.6.0.
<details>
<summary>Commits</summary>
<ul>
<li>See full diff in <a
href="https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/node">compare
view</a></li>
</ul>
</details>
<br />

Signed-off-by: dependabot[bot] <support@github.com>
Co-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>
```

#### Modified Files
- `package.json`
- `pnpm-lock.yaml`

#### Diff Summary
```text
5bf581876 build(deps-dev): Bump @types/node from 25.5.2 to 25.6.0 (#194)
 package.json   |  2 +-
 pnpm-lock.yaml | 64 +++++++++++++++++++++++++++++-----------------------------
 2 files changed, 33 insertions(+), 33 deletions(-)
```

### Commit 10: `126e65d`
- **Commit SHA:** `126e65d7c93cc154473e9bebaca1e599c163f006`
- **Previous SHA:** `5bf5818769f450c22a92a4942658a377e9928fd4`
- **Date:** `2026-04-15`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
feat: AID/LID architecture and Stat/Type Purge (#209)

Rebased Assistant logic on top of the data-driven map graph architecture
and modernized the data pipeline.

### Architectural Migration: Localized Evolution Data
- **Embedded Schema**: Fully migrated evolution data from the legacy
`chains.jsonl` store directly into the `pokemon.jsonl` database entries.
- **Redundancy Purge**: Removed the standalone `CHAINS` store and
eliminated redundant `cid` (Chain ID) and `pre` (Previous Form) fields
across the codebase.
- **Optimized Traversal**: Refactored `DexDataLoader` and the suggestion
engine to use direct property access for evolution paths, improving
runtime efficiency and type safety.

### Infrastructure Modernization: Vite Data Plugin
- **Native Asset Emission**: Refactored `pokedataPlugin` to use Rollup's
`emitFile` API during production builds, eliminating manual filesystem
side-effects in the `public/` directory.
- **Virtual Dev Serving**: Integrated Vite middleware to serve
`pokedata.json` and `pokedata.hash` virtually from memory during
development, keeping the source tree clean.
- **Zero-Boilerplate Config**: Simplified `vite.config.ts` by leveraging
the Vite `config()` hook to natively inject the `__POKEDATA_HASH__`
definition.
- **Cleanup**: Purged stale data generation scripts and optimized
`.gitignore` for the new virtualized pipeline.

### Application Stability & Deployment
- **Relative Pathing**: Switched `index.html` to use relative paths for
the manifest and main entry point, ensuring the app boots correctly when
served from a sub-base path (e.g., `/dexhelper/`).
- **Unified Identification**: Completed the removal of the redundant
Species ID (`sid`) field, aligning the entire application with a single
ROM-native `id` for Pokémon identification.
- **Stat/Type Purge**: Fully removed legacy DV extraction logic and
stat/type UI components to align with the leaner, data-driven model.

### Verification Matrix
- **Unit Tests**: All core logic and data schema tests passing (129+
tests).
- **E2E Suite**: Full Playwright suite (37 tests) passing across Desktop
and Mobile viewports.
- **Visual Regression**: Verified correct rendering of evolution data
and landing page state with new embedded model.
```

#### Modified Files
- `.agents/rules/git_workflow.md`
- `.bundlemonrc.json`
- `.github/workflows/sync-pokedata.yml`
- `.gitignore`
- `.serena/memories/db/data_format_strategy.md`
- `.serena/memories/db/data_format_strategy_msgpack_note.md`
- `.serena/memories/db/unified-id-refactor.md`
- `.serena/memories/development/pr_209_cleanup_done.md`
- `.serena/memories/dexhelper/data-model-cleanup-status.md`
- `.serena/memories/dexhelper/lean-data-migration-complete.md`
- `.serena/memories/dexhelper/refactor/localized-evolution-chains-arch.md`
- `.serena/memories/dexhelper/refactor/offline-modernization-v2.md`
- `.serena/memories/e2e/non_blocking_reporter.md`
- `.serena/memories/e2e/session_persistence_indexeddb.md`
- `.serena/memories/engine/mapGraph/gen1refactor.md`
- `.serena/memories/engine/navigation/indoor_resolution.md`
- `.serena/memories/infra/lefthook/biome_leak_fix.md`
- `.serena/memories/infrastructure/git_workflow_gotchas.md`
- `.serena/memories/purging-stats-and-types-completed.md`
- `.serena/memories/refactor/pokedb_engine_migration.md`
- `.serena/memories/refactor/pr-119-analysis.md`
- `.serena/memories/status/migration_summary_april_2026.md`
- `.serena/memories/status/pr-119-blockers.md`
- `.serena/memories/testing/coverage_status_apr2026.md`
- `.serena/memories/testing/e2e_patterns.md`
- `data/db/areas.jsonl`
- `data/db/encounters.jsonl`
- `data/db/location_index.jsonl`
- `data/db/locations.jsonl`
- `data/db/metadata.json`
- `data/db/pokemon.jsonl`
- `index.html`
- `lefthook.yml`
- `package.json`
- `playwright.config.ts`
- `pnpm-lock.yaml`
- `public/sw.js`
- `scripts/data/gen1/mapping.ts`
- `scripts/data/gen2/mapping.ts`
- `scripts/generate-pokedata.ts`
- `scripts/sync-pokedata.sh`
- `src/components/AppLayout.tsx`
- `src/components/AssistantPanel.tsx`
- `src/components/LocationSuggestions.tsx`
- `src/components/PokedexGrid.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/SearchAndFilters.tsx`
- `src/components/SyncProgress.tsx`
- `src/components/assistant/AssistantSuggestionCard.tsx`
- `src/components/pokemon/details/PokemonCaughtDetails.tsx`
- `src/components/pokemon/details/PokemonLocations.tsx`
- `src/components/pokemon/details/PokemonStats.tsx`
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
- `src/engine/data/gen1/assistantData.ts`
- `src/engine/exclusives/gen1Exclusives.ts`
- `src/engine/mapGraph/gen1Graph.test.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/mapGraph/index.ts`
- `src/engine/mapGraph/types.ts`
- `src/engine/saveParser/parsers/common.ts`
- `src/engine/saveParser/parsers/gen1.ts`
- `src/engine/saveParser/parsers/gen2.ts`
- `src/engine/saveParser/saveParser.test.ts`
- `src/hooks/useAssistant.test.ts`
- `src/hooks/useAssistant.ts`
- `src/main.tsx`
- `src/routes/__root.tsx`
- `src/store.ts`
- `src/test-setup.ts`
- `src/utils/pokeapi.test.ts`
- `src/utils/pokeapi.ts`
- `src/utils/pokemonQueries.ts`
- `src/vite-env.d.ts`
- `tests/e2e/assistant.spec.ts`
- `tests/e2e/filtering_logic.spec.ts`
- `tests/e2e/home.spec.ts`
- `tests/e2e/pokemon-details.spec.ts`
- `tests/e2e/save_management.spec.ts`
- `tests/e2e/setup.spec.ts`
- `tests/e2e/test-utils.ts`
- `tests/e2e/version_selection.spec.ts`
- `vite-plugins/pokedata-plugin.ts`
- `vite.config.ts`

#### Diff Summary
```text
126e65d7c feat: AID/LID architecture and Stat/Type Purge (#209)
 .agents/rules/git_workflow.md                      |   42 -
 .bundlemonrc.json                                  |    4 +
 .github/workflows/sync-pokedata.yml                |   37 +
 .gitignore                                         |    3 +
 .serena/memories/db/data_format_strategy.md        |    7 +
 .../db/data_format_strategy_msgpack_note.md        |    5 +
 .serena/memories/db/unified-id-refactor.md         |   20 +
 .../memories/development/pr_209_cleanup_done.md    |    8 +
 .../dexhelper/data-model-cleanup-status.md         |    8 +
 .../dexhelper/lean-data-migration-complete.md      |    7 +
 .../refactor/localized-evolution-chains-arch.md    |   11 +
 .../dexhelper/refactor/offline-modernization-v2.md |    8 +
 .serena/memories/e2e/non_blocking_reporter.md      |   18 +
 .../memories/e2e/session_persistence_indexeddb.md  |   14 +
 .serena/memories/engine/mapGraph/gen1refactor.md   |   13 +
 .../engine/navigation/indoor_resolution.md         |    6 +-
 .serena/memories/infra/lefthook/biome_leak_fix.md  |    1 +
 .../infrastructure/git_workflow_gotchas.md         |   18 +
 .../memories/purging-stats-and-types-completed.md  |   18 +
 .../memories/refactor/pokedb_engine_migration.md   |   15 +
 .serena/memories/refactor/pr-119-analysis.md       |    6 +
 .../status/migration_summary_april_2026.md         |   29 +
 .serena/memories/status/pr-119-blockers.md         |    5 +
 .../memories/testing/coverage_status_apr2026.md    |   15 +
 .serena/memories/testing/e2e_patterns.md           |    6 +-
 data/db/areas.jsonl                                |   76 +
 data/db/encounters.jsonl                           |  147 +
 data/db/location_index.jsonl                       |   76 +
 data/db/locations.jsonl                            |   76 +
 data/db/metadata.json                              |    4 +
 data/db/pokemon.jsonl                              |  251 ++
 index.html                                         |    4 +-
 lefthook.yml                                       |    3 +-
 package.json                                       |   17 +-
 playwright.config.ts                               |   23 +-
 pnpm-lock.yaml                                     | 4137 +++++++++++++++++---
 public/sw.js                                       |  166 -
 scripts/data/gen1/mapping.ts                       |   66 +
 scripts/data/gen2/mapping.ts                       |   83 +
 scripts/generate-pokedata.ts                       |  340 ++
 scripts/sync-pokedata.sh                           |   35 +
 src/components/AppLayout.tsx                       |    1 +
 src/components/AssistantPanel.tsx                  |   12 +-
 src/components/LocationSuggestions.tsx             |   92 +
 src/components/PokedexGrid.tsx                     |   27 +-
 src/components/PokemonDetails.tsx                  |  362 +-
 src/components/SearchAndFilters.tsx                |    9 +-
 src/components/SyncProgress.tsx                    |  142 +
 .../assistant/AssistantSuggestionCard.tsx          |    8 +
 .../pokemon/details/PokemonCaughtDetails.tsx       |   48 +-
 .../pokemon/details/PokemonLocations.tsx           |   60 +-
 src/components/pokemon/details/PokemonStats.tsx    |   71 -
 src/db/DexDataLoader.ts                            |   72 +
 src/db/PokeDB.ts                                   |  251 ++
 src/db/__tests__/DexDataLoader.test.ts             |   66 +
 src/db/__tests__/PokeDB.test.ts                    |  145 +
 src/db/schema.ts                                   |  196 +
 .../__tests__/fetchAssistantApiData.test.ts        |   62 +-
 .../assistant/__tests__/gen1Strategy.test.ts       |   41 +-
 .../__tests__/suggestionEngine.fix.test.ts         |   24 +-
 .../assistant/__tests__/test-coverage.test.ts      |  157 +-
 src/engine/assistant/strategies/gen1Strategy.ts    |   32 +-
 src/engine/assistant/strategies/types.ts           |   11 +-
 src/engine/assistant/suggestionEngine.ts           |  817 +---
 src/engine/data/gen1/assistantData.ts              |   70 +-
 src/engine/exclusives/gen1Exclusives.ts            |   51 +
 src/engine/mapGraph/gen1Graph.test.ts              |   91 +-
 src/engine/mapGraph/gen1Graph.ts                   |  262 +-
 src/engine/mapGraph/index.ts                       |   18 +-
 src/engine/mapGraph/types.ts                       |   11 +-
 src/engine/saveParser/parsers/common.ts            |    1 -
 src/engine/saveParser/parsers/gen1.ts              |    3 -
 src/engine/saveParser/parsers/gen2.ts              |    4 -
 src/engine/saveParser/saveParser.test.ts           |    1 -
 src/hooks/useAssistant.test.ts                     |   85 +-
 src/hooks/useAssistant.ts                          |   11 +-
 src/main.tsx                                       |   11 +-
 src/routes/__root.tsx                              |    6 +
 src/store.ts                                       |    4 +
 src/test-setup.ts                                  |   17 +
 src/utils/pokeapi.test.ts                          |   89 -
 src/utils/pokeapi.ts                               |   40 -
 src/utils/pokemonQueries.ts                        |   23 +-
 src/vite-env.d.ts                                  |    8 +-
 tests/e2e/assistant.spec.ts                        |   42 +
 tests/e2e/filtering_logic.spec.ts                  |    2 +-
 tests/e2e/home.spec.ts                             |    2 +-
 tests/e2e/pokemon-details.spec.ts                  |   45 +
 tests/e2e/save_management.spec.ts                  |    5 +-
 tests/e2e/setup.spec.ts                            |   17 +
 tests/e2e/test-utils.ts                            |   72 +-
 tests/e2e/version_selection.spec.ts                |    9 +-
 vite-plugins/pokedata-plugin.ts                    |  116 +
 vite.config.ts                                     |   46 +-
 94 files changed, 7182 insertions(+), 2514 deletions(-)
```


## Evaluation Instructions
As Changelogger, independently inspect the code diffs for this batch by running `git show <sha>` or `git diff 1cf13ad37fddbdb3d46ab5f515a02c5c8614b28a..126e65d7c93cc154473e9bebaca1e599c163f006` in bash. If the clone is shallow (`git rev-parse --is-shallow-repository` returns `true`), run `git fetch --unshallow` first.

Synthesize the technical changes across all commits in this batch:
1. **Grouping / Merging**: Based on your judgment of the diffs, decide whether to group multiple commits into a single changelog entry or release version, split them into separate releases, or merge entries into a previous release header in `CHANGELOG-dexhelper.md`.
2. **Selective Inclusion**: Omit internal/trivial changes that do not warrant a user-facing or system maintainer changelog entry.
3. **Documentation**: Update `README.md` if any commit in the batch alters setup, features, or architecture.
4. **Link References**: If a changelog entry is added, include diff links (e.g. [`0.28.0...0.29.0`](https://github.com/${repo}/compare/1cf13ad...126e65d)) and update link references at the bottom of `CHANGELOG-dexhelper.md`.
5. **No Changes Needed**: If no commits in the batch warrant changelog or README updates, submit an Empty PR.
