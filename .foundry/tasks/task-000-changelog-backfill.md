---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: COMPLETED
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-10-22'
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

Target commit batch (5 commits) injected by `changelog-engine.ts`:

- **Batch Size:** 5
- **Primary Domain:** dexhelper
- **Suggested Overall SemVer Bump:** `patch` (from `0.25.0` -> `0.25.1`)
- **Range:** `a18cf2a...8ed973e`

## Commits in Batch

### Commit 1: `4cff60b`
- **Commit SHA:** `4cff60b2250f29da376e778817e95ecdf6127f4a`
- **Previous SHA:** `a18cf2a547687991de4af3b100e4d45e528ebe19`
- **Date:** `2026-04-06`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps): Bump @tanstack/react-query from 5.96.1 to 5.96.2 in the tanstack group (#92)

Bumps the tanstack group with 1 update:
[@tanstack/react-query](https://github.com/TanStack/query/tree/HEAD/packages/react-query).

Updates `@tanstack/react-query` from 5.96.1 to 5.96.2
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/TanStack/query/releases"><code>@​tanstack/react-query</code>'s
releases</a>.</em></p>
<blockquote>
<h2><code>@​tanstack/react-query-devtools</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-devtools</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query-next-experimental</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query-persist-client</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-persist-client-core</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
<li><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
</ul>
</li>
</ul>
<h2><code>@​tanstack/react-query</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-core</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
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
<h2>5.96.2</h2>
<h3>Patch Changes</h3>
<ul>
<li>Updated dependencies []:
<ul>
<li><code>@​tanstack/query-core</code><a
href="https://github.com/5"><code>@​5</code></a>.96.2</li>
</ul>
</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/TanStack/query/commit/5ca721fb05a7329ca168dd9aca8a906011b0601e"><code>5ca721f</code></a>
ci: Version Packages (<a
href="https://github.com/TanStack/query/tree/HEAD/packages/react-query/issues/10379">#10379</a>)</li>
<li>See full diff in <a
href="https://github.com/TanStack/query/commits/@tanstack/react-query@5.96.2/packages/react-query">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@tanstack/react-query&package-manager=npm_and_yarn&previous-version=5.96.1&new-version=5.96.2)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
4cff60b22 build(deps): Bump @tanstack/react-query from 5.96.1 to 5.96.2 in the tanstack group (#92)
 package-lock.json | 16 ++++++++--------
 package.json      |  2 +-
 2 files changed, 9 insertions(+), 9 deletions(-)
```

### Commit 2: `2c65294`
- **Commit SHA:** `2c6529481bf433c1edd6f7f4b57a8076dd5ddf82`
- **Previous SHA:** `4cff60b2250f29da376e778817e95ecdf6127f4a`
- **Date:** `2026-04-06`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
Enhance Assistant with In-Game NPC Trade Suggestions (#89)

This pull request enhances the AI Assistant algorithm to intelligently
suggest in-game NPC trades (e.g., trading an Abra for Mr. Mime on Route
2 in Gen 1).

It leverages existing `STATIC_NPC_TRADE_DATA` to populate the "Trade
Required" category dynamically. The system is able to identify if a
trade has already been executed on the save file by matching the traded
Pokémon's ID with the distinct Original Trainer name hardcoded into the
original game (e.g., "MARCEL"). If the trade hasn't been completed, it
evaluates the player's current pokedex collection to instruct them
properly, taking into account if they need to catch the offered Pokémon
first, or if they already have it in their PC/Party.

It also upgrades the `AssistantSuggestionCard` component to allow
rendering multiple dynamic Pokémon ID placeholders `#<id>` in titles and
descriptions, converting them seamlessly into properly formatted Pokémon
names.

---
*PR created automatically by Jules for task
[3884066622594838652](https://jules.google.com/task/3884066622594838652)
started by @szubster*

---------

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `src/components/assistant/AssistantSuggestionCard.tsx`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/data/gen1/assistantData.ts`
- `src/engine/saveParser/index.ts`

#### Diff Summary
```text
2c6529481 Enhance Assistant with In-Game NPC Trade Suggestions (#89)
 .../assistant/AssistantSuggestionCard.tsx          | 16 +++++---
 src/engine/assistant/suggestionEngine.ts           | 43 +++++++++++++++++++++-
 src/engine/data/gen1/assistantData.ts              | 22 ++++++-----
 src/engine/saveParser/index.ts                     |  4 +-
 4 files changed, 68 insertions(+), 17 deletions(-)
```

### Commit 3: `949aef3`
- **Commit SHA:** `949aef3f76e2a732993471ca5180388bf64ae8c4`
- **Previous SHA:** `2c6529481bf433c1edd6f7f4b57a8076dd5ddf82`
- **Date:** `2026-04-06`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
refactor: remove redundant accessibility attributes from SettingsModal toggle button
```

#### Modified Files
- `src/components/SettingsModal.tsx`

#### Diff Summary
```text
949aef3f7 refactor: remove redundant accessibility attributes from SettingsModal toggle button
 src/components/SettingsModal.tsx | 57 +++++++++++++++++++---------------------
 1 file changed, 27 insertions(+), 30 deletions(-)
```

### Commit 4: `8292f6b`
- **Commit SHA:** `8292f6b332b60a8671d2b6f46c73924997226260`
- **Previous SHA:** `949aef3f76e2a732993471ca5180388bf64ae8c4`
- **Date:** `2026-04-06`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
fix: improve Pokemon Yellow save detection (#102)

This PR fixes a bug where Yellow saves were incorrectly detected as Blue
when they contained traded version-exclusive Pokemon (like Meowth).

Specifically:
- Added checks for Following Pikachu (0x271C) and Happiness (0x271D) as
definitive Yellow markers.
- Filtering version exclusives by Original Trainer (OT) Name to avoid
false positives from trades.
- Improved 'unknown' fallback for ambiguous early-game saves.
```

#### Modified Files
- `src/engine/saveParser/index.ts`

#### Diff Summary
```text
8292f6b33 fix: improve Pokemon Yellow save detection (#102)
 src/engine/saveParser/index.ts | 92 +++++++++++++++++++++++++++++-------------
 1 file changed, 64 insertions(+), 28 deletions(-)
```

### Commit 5: `8ed973e`
- **Commit SHA:** `8ed973e2e6c042bd60543dee85e822baeba4f9bf`
- **Previous SHA:** `8292f6b332b60a8671d2b6f46c73924997226260`
- **Date:** `2026-04-06`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
fix: resolve 1-byte offset shift in Pokemon Yellow save parser (#103)

This PR fixes a systemic 1-byte offset shift in English Pokemon Yellow
saves that caused incorrect map detection and corrupted Pokedex data.
Also increases the suggestion target limit to 100 for better visibility.
```

#### Modified Files
- `debug_save.ts`
- `src/engine/assistant/suggestionEngine.ts`
- `src/engine/mapGraph/gen1Graph.test.ts`
- `src/engine/mapGraph/gen1Graph.ts`
- `src/engine/saveParser/index.test.ts`
- `src/engine/saveParser/index.ts`
- `src/engine/saveParser/repro.test.ts`

#### Diff Summary
```text
8ed973e2e fix: resolve 1-byte offset shift in Pokemon Yellow save parser (#103)
 debug_save.ts                            | 14 ++++++++
 src/engine/assistant/suggestionEngine.ts |  6 +++-
 src/engine/mapGraph/gen1Graph.test.ts    | 14 ++++++++
 src/engine/mapGraph/gen1Graph.ts         |  5 ++-
 src/engine/saveParser/index.test.ts      | 57 ++++++++++++++++++++++++++++++++
 src/engine/saveParser/index.ts           | 47 ++++++++++++++------------
 src/engine/saveParser/repro.test.ts      | 27 +++++++++++++++
 7 files changed, 147 insertions(+), 23 deletions(-)
```


## Evaluation Instructions
As Changelogger, independently inspect the code diffs for this batch by running `git show <sha>` or `git diff a18cf2a547687991de4af3b100e4d45e528ebe19..8ed973e2e6c042bd60543dee85e822baeba4f9bf` in bash. If the clone is shallow (`git rev-parse --is-shallow-repository` returns `true`), run `git fetch --unshallow` first.

Synthesize the technical changes across all commits in this batch:
1. **Grouping / Merging**: Based on your judgment of the diffs, decide whether to group multiple commits into a single changelog entry or release version, split them into separate releases, or merge entries into a previous release header in `CHANGELOG-dexhelper.md`.
2. **Selective Inclusion**: Omit internal/trivial changes that do not warrant a user-facing or system maintainer changelog entry.
3. **Documentation**: Update `README.md` if any commit in the batch alters setup, features, or architecture.
4. **Link References**: If a changelog entry is added, include diff links (e.g. [`0.25.0...0.25.1`](https://github.com/${repo}/compare/a18cf2a...8ed973e)) and update link references at the bottom of `CHANGELOG-dexhelper.md`.
5. **No Changes Needed**: If no commits in the batch warrant changelog or README updates, submit an Empty PR.
