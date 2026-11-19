---
id: task-000-changelog-backfill
type: TASK
title: Changelog Backfill Commit Evaluation
status: READY
owner_persona: changelogger
created_at: '2026-04-20'
updated_at: '2026-11-19'
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
- **Suggested Overall SemVer Bump:** `minor` (from `1.3.0` -> `1.4.0`)
- **Range:** `4b11f2e...cb4c7e6`

## Commits in Batch

### Commit 1: `38b8d4f`
- **Commit SHA:** `38b8d4ff401abc57ee14aeb3e37621e77c631d03`
- **Previous SHA:** `4b11f2e54ae369a5abfbdf83a6bc945b9ecba3d5`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump vite from 8.0.8 to 8.0.9 in the vite group (#317)

Bumps the vite group with 1 update:
[vite](https://github.com/vitejs/vite/tree/HEAD/packages/vite).

Updates `vite` from 8.0.8 to 8.0.9
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/vitejs/vite/releases">vite's
releases</a>.</em></p>
<blockquote>
<h2>v8.0.9</h2>
<p>Please refer to <a
href="https://github.com/vitejs/vite/blob/v8.0.9/packages/vite/CHANGELOG.md">CHANGELOG.md</a>
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
href="https://github.com/vitejs/vite/compare/v8.0.8...v8.0.9">8.0.9</a>
(2026-04-20)<!-- raw HTML omitted --></h2>
<h3>Features</h3>
<ul>
<li>update rolldown to 1.0.0-rc.16 (<a
href="https://redirect.github.com/vitejs/vite/issues/22248">#22248</a>)
(<a
href="https://github.com/vitejs/vite/commit/2947edd57ceb64a0b4dc43269743e8e44e68c09b">2947edd</a>)</li>
</ul>
<h3>Bug Fixes</h3>
<ul>
<li>allow binding when strictPort is set but wildcard port is in use (<a
href="https://redirect.github.com/vitejs/vite/issues/22150">#22150</a>)
(<a
href="https://github.com/vitejs/vite/commit/dfc8aa5057dd8ec2b1223980d1e2eeb946ac3384">dfc8aa5</a>)</li>
<li><strong>build:</strong> emptyOutDir should happen for watch rebuilds
(<a
href="https://redirect.github.com/vitejs/vite/issues/22207">#22207</a>)
(<a
href="https://github.com/vitejs/vite/commit/ee522672bb374c7ff95a347f14732491121b1cd6">ee52267</a>)</li>
<li><strong>bundled-dev:</strong> reject requests to HMR patch files in
non potentially trustworthy origins (<a
href="https://redirect.github.com/vitejs/vite/issues/22269">#22269</a>)
(<a
href="https://github.com/vitejs/vite/commit/868f1411a6f474baa4417f2d6524692dd452f760">868f141</a>)</li>
<li><strong>css:</strong> use unique key for cssEntriesMap to prevent
same-basename collision (<a
href="https://redirect.github.com/vitejs/vite/issues/22039">#22039</a>)
(<a
href="https://github.com/vitejs/vite/commit/374bb5d597fcd0485e929565c698d8ed219136f8">374bb5d</a>)</li>
<li><strong>deps:</strong> update all non-major dependencies (<a
href="https://redirect.github.com/vitejs/vite/issues/22219">#22219</a>)
(<a
href="https://github.com/vitejs/vite/commit/4cd0d6760edd5fb0841abe86538de3c225e880a1">4cd0d67</a>)</li>
<li><strong>deps:</strong> update all non-major dependencies (<a
href="https://redirect.github.com/vitejs/vite/issues/22268">#22268</a>)
(<a
href="https://github.com/vitejs/vite/commit/c28e9c12a849f80e6fdc93f42283ad2863ab9dbc">c28e9c1</a>)</li>
<li>detect Deno workspace root (fix <a
href="https://redirect.github.com/vitejs/vite/issues/22237">#22237</a>)
(<a
href="https://redirect.github.com/vitejs/vite/issues/22238">#22238</a>)
(<a
href="https://github.com/vitejs/vite/commit/1b793c0e1726467fffd06ffad9bc81c61a840188">1b793c0</a>)</li>
<li><strong>dev:</strong> handle errors in <code>watchChange</code> hook
(<a
href="https://redirect.github.com/vitejs/vite/issues/22188">#22188</a>)
(<a
href="https://github.com/vitejs/vite/commit/fc08bdab9bba871b03689f2f6997c3a4ba4351da">fc08bda</a>)</li>
<li><strong>optimizer:</strong> handle more chars that will be sanitized
(<a
href="https://redirect.github.com/vitejs/vite/issues/22208">#22208</a>)
(<a
href="https://github.com/vitejs/vite/commit/3f24533ac4845ed22547279d1721bd82a35345e3">3f24533</a>)</li>
<li>skip fallback sourcemap generation for <code>?raw</code> imports (<a
href="https://redirect.github.com/vitejs/vite/issues/22148">#22148</a>)
(<a
href="https://github.com/vitejs/vite/commit/3ec9cdaac7936ca32d0956c4cb1eb6e172945996">3ec9cda</a>)</li>
</ul>
<h3>Documentation</h3>
<ul>
<li>align the descriptions in READMEs (<a
href="https://redirect.github.com/vitejs/vite/issues/22231">#22231</a>)
(<a
href="https://github.com/vitejs/vite/commit/44c42b97639bb6ad777e66d752b2829cccb9a27a">44c42b9</a>)</li>
<li>fix reuses wording in dev environment comment (<a
href="https://redirect.github.com/vitejs/vite/issues/22173">#22173</a>)
(<a
href="https://github.com/vitejs/vite/commit/9163412fdfec7fb1656529713326a5b5c5e986ea">9163412</a>)</li>
<li>fix wording in sass error comment (<a
href="https://redirect.github.com/vitejs/vite/issues/22214">#22214</a>)
(<a
href="https://github.com/vitejs/vite/commit/bc5c6a7a498845dff20dc410c395355b79a4b753">bc5c6a7</a>)</li>
<li>update build CLI defaults (<a
href="https://redirect.github.com/vitejs/vite/issues/22261">#22261</a>)
(<a
href="https://github.com/vitejs/vite/commit/605bb97994678a1bb70a8de9a85c29d5f5d48c5a">605bb97</a>)</li>
</ul>
<h3>Miscellaneous Chores</h3>
<ul>
<li><strong>deps:</strong> update dependency dotenv-expand to v13 (<a
href="https://redirect.github.com/vitejs/vite/issues/22271">#22271</a>)
(<a
href="https://github.com/vitejs/vite/commit/0a3887da18812cacb254c616e4dd35631e776fda">0a3887d</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/vitejs/vite/commit/ce729f5fa1a5adca373b2adcb0e1b18099164a14"><code>ce729f5</code></a>
release: v8.0.9</li>
<li><a
href="https://github.com/vitejs/vite/commit/605bb97994678a1bb70a8de9a85c29d5f5d48c5a"><code>605bb97</code></a>
docs: update build CLI defaults (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22261">#22261</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/c28e9c12a849f80e6fdc93f42283ad2863ab9dbc"><code>c28e9c1</code></a>
fix(deps): update all non-major dependencies (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22268">#22268</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/0a3887da18812cacb254c616e4dd35631e776fda"><code>0a3887d</code></a>
chore(deps): update dependency dotenv-expand to v13 (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22271">#22271</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/868f1411a6f474baa4417f2d6524692dd452f760"><code>868f141</code></a>
fix(bundled-dev): reject requests to HMR patch files in non potentially
trust...</li>
<li><a
href="https://github.com/vitejs/vite/commit/3ec9cdaac7936ca32d0956c4cb1eb6e172945996"><code>3ec9cda</code></a>
fix: skip fallback sourcemap generation for <code>?raw</code> imports
(<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22148">#22148</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/3f24533ac4845ed22547279d1721bd82a35345e3"><code>3f24533</code></a>
fix(optimizer): handle more chars that will be sanitized (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22208">#22208</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/1b793c0e1726467fffd06ffad9bc81c61a840188"><code>1b793c0</code></a>
fix: detect Deno workspace root (fix <a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22237">#22237</a>)
(<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22238">#22238</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/fc08bdab9bba871b03689f2f6997c3a4ba4351da"><code>fc08bda</code></a>
fix(dev): handle errors in <code>watchChange</code> hook (<a
href="https://github.com/vitejs/vite/tree/HEAD/packages/vite/issues/22188">#22188</a>)</li>
<li><a
href="https://github.com/vitejs/vite/commit/374bb5d597fcd0485e929565c698d8ed219136f8"><code>374bb5d</code></a>
fix(css): use unique key for cssEntriesMap to prevent same-basename
collision...</li>
<li>Additional commits viewable in <a
href="https://github.com/vitejs/vite/commits/v8.0.9/packages/vite">compare
view</a></li>
</ul>
</details>
<br />


[![Dependabot compatibility
score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=vite&package-manager=npm_and_yarn&previous-version=8.0.8&new-version=8.0.9)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

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
- `package.json`
- `pnpm-lock.yaml`

#### Diff Summary
```text
38b8d4ff4 build(deps-dev): Bump vite from 8.0.8 to 8.0.9 in the vite group (#317)
 package.json   |   2 +-
 pnpm-lock.yaml | 250 ++++++++++++++++++++++++++++-----------------------------
 2 files changed, 126 insertions(+), 126 deletions(-)
```

### Commit 2: `cc790db`
- **Commit SHA:** `cc790db9f4bd02f705d1ad0d2ecb65369031de78`
- **Previous SHA:** `38b8d4ff401abc57ee14aeb3e37621e77c631d03`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
build(deps-dev): Bump the tailwind group across 1 directory with 2 updates (#318)

Bumps the tailwind group with 2 updates in the / directory:
[@tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/@tailwindcss-vite)
and
[tailwindcss](https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss).

Updates `@tailwindcss/vite` from 4.2.2 to 4.2.3
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/tailwindlabs/tailwindcss/releases"><code>@​tailwindcss/vite</code>'s
releases</a>.</em></p>
<blockquote>
<h2>v4.2.3</h2>
<h3>Fixed</h3>
<ul>
<li>Canonicalization: improve canonicalizations for
<code>tracking-*</code> utilities by preferring non-negative utilities
(e.g. <code>-tracking-tighter</code> → <code>tracking-wider</code>) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19827">#19827</a>)</li>
<li>Fix crash due to invalid characters in candidate (exceeding valid
unicode code point range) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19829">#19829</a>)</li>
<li>Ensure query params in imports are considered unique resources when
using <code>@tailwindcss/webpack</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19723">#19723</a>)</li>
<li>Canonicalization: collapse arbitrary values into shorthand utilities
(e.g. <code>px-[1.2rem] py-[1.2rem]</code> → <code>p-[1.2rem]</code>)
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19837">#19837</a>)</li>
<li>Canonicalization: collapse <code>border-{t,b}-*</code> into
<code>border-y-*</code>, <code>border-{l,r}-*</code> into
<code>border-x-*</code>, and <code>border-{t,r,b,l}-*</code> into
<code>border-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-m{t,b}-*</code> into
<code>scroll-my-*</code>, <code>scroll-m{l,r}-*</code> into
<code>scroll-mx-*</code>, and <code>scroll-m{t,r,b,l}-*</code> into
<code>scroll-m-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-p{t,b}-*</code> into
<code>scroll-py-*</code>, <code>scroll-p{l,r}-*</code> into
<code>scroll-px-*</code>, and <code>scroll-p{t,r,b,l}-*</code> into
<code>scroll-p-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overflow-{x,y}-*</code> into
<code>overflow-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overscroll-{x,y}-*</code> into
<code>overscroll-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Read from <code>--placeholder-color</code> instead of
<code>--background-color</code> for <code>placeholder-*</code> utilities
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19843">#19843</a>)</li>
<li>Upgrade: ensure files are not emptied out when killing the upgrade
process while it's running (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: use <code>config.content</code> when migrating from
Tailwind CSS v3 to Tailwind CSS v4 (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: never migrate files that are ignored by git (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Add <code>.env</code> and <code>.env.*</code> to default ignored
content files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Canonicalization: migrate <code>overflow-ellipsis</code> into
<code>text-ellipsis</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>start-full</code> →
<code>inset-s-full</code>, <code>start-auto</code> →
<code>inset-s-auto</code>, <code>start-px</code> →
<code>inset-s-px</code>, and <code>start-&lt;number&gt;</code> →
<code>inset-s-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>end-full</code> →
<code>inset-e-full</code>, <code>end-auto</code> →
<code>inset-e-auto</code>, <code>end-px</code> →
<code>inset-e-px</code>, and <code>end-&lt;number&gt;</code> →
<code>inset-e-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: move the <code>-</code> sign inside the arbitrary
value <code>-left-[9rem]</code> → <code>left-[-9rem]</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Canonicalization: move the <code>-</code> sign outside the arbitrary
value <code>ml-[calc(-1*var(--width))]</code> →
<code>-ml-(--width)</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Improve performance when scanning JSONL / NDJSON files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19862">#19862</a>)</li>
<li>Support <code>NODE_PATH</code> environment variable in standalone
CLI (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19617">#19617</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a
href="https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md"><code>@​tailwindcss/vite</code>'s
changelog</a>.</em></p>
<blockquote>
<h2>[4.2.3] - 2026-04-20</h2>
<h3>Fixed</h3>
<ul>
<li>Canonicalization: improve canonicalizations for
<code>tracking-*</code> utilities by preferring non-negative utilities
(e.g. <code>-tracking-tighter</code> → <code>tracking-wider</code>) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19827">#19827</a>)</li>
<li>Fix crash due to invalid characters in candidate (exceeding valid
unicode code point range) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19829">#19829</a>)</li>
<li>Ensure query params in imports are considered unique resources when
using <code>@tailwindcss/webpack</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19723">#19723</a>)</li>
<li>Canonicalization: collapse arbitrary values into shorthand utilities
(e.g. <code>px-[1.2rem] py-[1.2rem]</code> → <code>p-[1.2rem]</code>)
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19837">#19837</a>)</li>
<li>Canonicalization: collapse <code>border-{t,b}-*</code> into
<code>border-y-*</code>, <code>border-{l,r}-*</code> into
<code>border-x-*</code>, and <code>border-{t,r,b,l}-*</code> into
<code>border-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-m{t,b}-*</code> into
<code>scroll-my-*</code>, <code>scroll-m{l,r}-*</code> into
<code>scroll-mx-*</code>, and <code>scroll-m{t,r,b,l}-*</code> into
<code>scroll-m-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-p{t,b}-*</code> into
<code>scroll-py-*</code>, <code>scroll-p{l,r}-*</code> into
<code>scroll-px-*</code>, and <code>scroll-p{t,r,b,l}-*</code> into
<code>scroll-p-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overflow-{x,y}-*</code> into
<code>overflow-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overscroll-{x,y}-*</code> into
<code>overscroll-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Read from <code>--placeholder-color</code> instead of
<code>--background-color</code> for <code>placeholder-*</code> utilities
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19843">#19843</a>)</li>
<li>Upgrade: ensure files are not emptied out when killing the upgrade
process while it's running (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: use <code>config.content</code> when migrating from
Tailwind CSS v3 to Tailwind CSS v4 (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: never migrate files that are ignored by git (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Add <code>.env</code> and <code>.env.*</code> to default ignored
content files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Canonicalization: migrate <code>overflow-ellipsis</code> into
<code>text-ellipsis</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>start-full</code> →
<code>inset-s-full</code>, <code>start-auto</code> →
<code>inset-s-auto</code>, <code>start-px</code> →
<code>inset-s-px</code>, and <code>start-&lt;number&gt;</code> →
<code>inset-s-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>end-full</code> →
<code>inset-e-full</code>, <code>end-auto</code> →
<code>inset-e-auto</code>, <code>end-px</code> →
<code>inset-e-px</code>, and <code>end-&lt;number&gt;</code> →
<code>inset-e-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: move the <code>-</code> sign inside the arbitrary
value <code>-left-[9rem]</code> → <code>left-[-9rem]</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Canonicalization: move the <code>-</code> sign outside the arbitrary
value <code>ml-[calc(-1*var(--width))]</code> →
<code>-ml-(--width)</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Improve performance when scanning JSONL / NDJSON files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19862">#19862</a>)</li>
<li>Support <code>NODE_PATH</code> environment variable in standalone
CLI (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19617">#19617</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/2e3fa490a535a8341fd2853d75098f0d4dbcc825"><code>2e3fa49</code></a>
4.2.3 (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/@tailwindcss-vite/issues/19944">#19944</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/5cb1efdf416a6d37012d31cc1306c41cb35bbdc1"><code>5cb1efd</code></a>
fix(vite): resolve tsconfig paths in CSS and JS resolvers (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/@tailwindcss-vite/issues/19803">#19803</a>)</li>
<li>See full diff in <a
href="https://github.com/tailwindlabs/tailwindcss/commits/v4.2.3/packages/@tailwindcss-vite">compare
view</a></li>
</ul>
</details>
<details>
<summary>Maintainer changes</summary>
<p>This version was pushed to npm by [GitHub Actions](<a
href="https://www.npmjs.com/~GitHub">https://www.npmjs.com/~GitHub</a>
Actions), a new releaser for <code>@​tailwindcss/vite</code> since your
current version.</p>
</details>
<br />

Updates `tailwindcss` from 4.2.2 to 4.2.3
<details>
<summary>Release notes</summary>
<p><em>Sourced from <a
href="https://github.com/tailwindlabs/tailwindcss/releases">tailwindcss's
releases</a>.</em></p>
<blockquote>
<h2>v4.2.3</h2>
<h3>Fixed</h3>
<ul>
<li>Canonicalization: improve canonicalizations for
<code>tracking-*</code> utilities by preferring non-negative utilities
(e.g. <code>-tracking-tighter</code> → <code>tracking-wider</code>) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19827">#19827</a>)</li>
<li>Fix crash due to invalid characters in candidate (exceeding valid
unicode code point range) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19829">#19829</a>)</li>
<li>Ensure query params in imports are considered unique resources when
using <code>@tailwindcss/webpack</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19723">#19723</a>)</li>
<li>Canonicalization: collapse arbitrary values into shorthand utilities
(e.g. <code>px-[1.2rem] py-[1.2rem]</code> → <code>p-[1.2rem]</code>)
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19837">#19837</a>)</li>
<li>Canonicalization: collapse <code>border-{t,b}-*</code> into
<code>border-y-*</code>, <code>border-{l,r}-*</code> into
<code>border-x-*</code>, and <code>border-{t,r,b,l}-*</code> into
<code>border-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-m{t,b}-*</code> into
<code>scroll-my-*</code>, <code>scroll-m{l,r}-*</code> into
<code>scroll-mx-*</code>, and <code>scroll-m{t,r,b,l}-*</code> into
<code>scroll-m-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-p{t,b}-*</code> into
<code>scroll-py-*</code>, <code>scroll-p{l,r}-*</code> into
<code>scroll-px-*</code>, and <code>scroll-p{t,r,b,l}-*</code> into
<code>scroll-p-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overflow-{x,y}-*</code> into
<code>overflow-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overscroll-{x,y}-*</code> into
<code>overscroll-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Read from <code>--placeholder-color</code> instead of
<code>--background-color</code> for <code>placeholder-*</code> utilities
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19843">#19843</a>)</li>
<li>Upgrade: ensure files are not emptied out when killing the upgrade
process while it's running (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: use <code>config.content</code> when migrating from
Tailwind CSS v3 to Tailwind CSS v4 (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: never migrate files that are ignored by git (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Add <code>.env</code> and <code>.env.*</code> to default ignored
content files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Canonicalization: migrate <code>overflow-ellipsis</code> into
<code>text-ellipsis</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>start-full</code> →
<code>inset-s-full</code>, <code>start-auto</code> →
<code>inset-s-auto</code>, <code>start-px</code> →
<code>inset-s-px</code>, and <code>start-&lt;number&gt;</code> →
<code>inset-s-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>end-full</code> →
<code>inset-e-full</code>, <code>end-auto</code> →
<code>inset-e-auto</code>, <code>end-px</code> →
<code>inset-e-px</code>, and <code>end-&lt;number&gt;</code> →
<code>inset-e-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: move the <code>-</code> sign inside the arbitrary
value <code>-left-[9rem]</code> → <code>left-[-9rem]</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Canonicalization: move the <code>-</code> sign outside the arbitrary
value <code>ml-[calc(-1*var(--width))]</code> →
<code>-ml-(--width)</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Improve performance when scanning JSONL / NDJSON files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19862">#19862</a>)</li>
<li>Support <code>NODE_PATH</code> environment variable in standalone
CLI (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19617">#19617</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Changelog</summary>
<p><em>Sourced from <a
href="https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md">tailwindcss's
changelog</a>.</em></p>
<blockquote>
<h2>[4.2.3] - 2026-04-20</h2>
<h3>Fixed</h3>
<ul>
<li>Canonicalization: improve canonicalizations for
<code>tracking-*</code> utilities by preferring non-negative utilities
(e.g. <code>-tracking-tighter</code> → <code>tracking-wider</code>) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19827">#19827</a>)</li>
<li>Fix crash due to invalid characters in candidate (exceeding valid
unicode code point range) (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19829">#19829</a>)</li>
<li>Ensure query params in imports are considered unique resources when
using <code>@tailwindcss/webpack</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19723">#19723</a>)</li>
<li>Canonicalization: collapse arbitrary values into shorthand utilities
(e.g. <code>px-[1.2rem] py-[1.2rem]</code> → <code>p-[1.2rem]</code>)
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19837">#19837</a>)</li>
<li>Canonicalization: collapse <code>border-{t,b}-*</code> into
<code>border-y-*</code>, <code>border-{l,r}-*</code> into
<code>border-x-*</code>, and <code>border-{t,r,b,l}-*</code> into
<code>border-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-m{t,b}-*</code> into
<code>scroll-my-*</code>, <code>scroll-m{l,r}-*</code> into
<code>scroll-mx-*</code>, and <code>scroll-m{t,r,b,l}-*</code> into
<code>scroll-m-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>scroll-p{t,b}-*</code> into
<code>scroll-py-*</code>, <code>scroll-p{l,r}-*</code> into
<code>scroll-px-*</code>, and <code>scroll-p{t,r,b,l}-*</code> into
<code>scroll-p-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overflow-{x,y}-*</code> into
<code>overflow-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Canonicalization: collapse <code>overscroll-{x,y}-*</code> into
<code>overscroll-*</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19842">#19842</a>)</li>
<li>Read from <code>--placeholder-color</code> instead of
<code>--background-color</code> for <code>placeholder-*</code> utilities
(<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19843">#19843</a>)</li>
<li>Upgrade: ensure files are not emptied out when killing the upgrade
process while it's running (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: use <code>config.content</code> when migrating from
Tailwind CSS v3 to Tailwind CSS v4 (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Upgrade: never migrate files that are ignored by git (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Add <code>.env</code> and <code>.env.*</code> to default ignored
content files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19846">#19846</a>)</li>
<li>Canonicalization: migrate <code>overflow-ellipsis</code> into
<code>text-ellipsis</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>start-full</code> →
<code>inset-s-full</code>, <code>start-auto</code> →
<code>inset-s-auto</code>, <code>start-px</code> →
<code>inset-s-px</code>, and <code>start-&lt;number&gt;</code> →
<code>inset-s-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: migrate <code>end-full</code> →
<code>inset-e-full</code>, <code>end-auto</code> →
<code>inset-e-auto</code>, <code>end-px</code> →
<code>inset-e-px</code>, and <code>end-&lt;number&gt;</code> →
<code>inset-e-&lt;number&gt;</code> as well as negative versions (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19849">#19849</a>)</li>
<li>Canonicalization: move the <code>-</code> sign inside the arbitrary
value <code>-left-[9rem]</code> → <code>left-[-9rem]</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Canonicalization: move the <code>-</code> sign outside the arbitrary
value <code>ml-[calc(-1*var(--width))]</code> →
<code>-ml-(--width)</code> (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19858">#19858</a>)</li>
<li>Improve performance when scanning JSONL / NDJSON files (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19862">#19862</a>)</li>
<li>Support <code>NODE_PATH</code> environment variable in standalone
CLI (<a
href="https://redirect.github.com/tailwindlabs/tailwindcss/pull/19617">#19617</a>)</li>
</ul>
</blockquote>
</details>
<details>
<summary>Commits</summary>
<ul>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/2e3fa490a535a8341fd2853d75098f0d4dbcc825"><code>2e3fa49</code></a>
4.2.3 (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19944">#19944</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/df6209ab8b957e56e6e00042a3e4080c14a072ea"><code>df6209a</code></a>
Canonicalize negative arbitrary values (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19858">#19858</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/52fd421cc941aad650db769f04b77d08c56951df"><code>52fd421</code></a>
Small refactor of canonicalization tests (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19851">#19851</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/c385fd36bcce707a02c229ebeb66ea88e12eb041"><code>c385fd3</code></a>
use <code>test.each</code> instead of manual loop</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/0d6e038889f49a809a4077ef7badc7d43184cd42"><code>0d6e038</code></a>
fix index in test name</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/88a2d22c2fdb65c5f8c3b2f68db9713f8bf2e656"><code>88a2d22</code></a>
Add more canonicalization rules for deprecated utilities (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19849">#19849</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/2c1ef9eb2564f2c83df970eb9f68c19d340c02e5"><code>2c1ef9e</code></a>
Use <code>--placeholder-color</code> instead of
<code>--background-color</code> for <code>placeholder-*</code>...</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/28d526859dfd1efe204c8f037c3fe472d9b5d08e"><code>28d5268</code></a>
Collapse more utilities by expanding their declarations (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19842">#19842</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/b55d96002ce4516c5158ad3565229267b948c1ac"><code>b55d960</code></a>
fix(canonicalize): collapse arbitrary values into shorthand utilities
(<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19837">#19837</a>)</li>
<li><a
href="https://github.com/tailwindlabs/tailwindcss/commit/bd30a716e640550748f7029506f3758e9da4aecb"><code>bd30a71</code></a>
Fix crash due to invalid characters in candidate (<a
href="https://github.com/tailwindlabs/tailwindcss/tree/HEAD/packages/tailwindcss/issues/19829">#19829</a>)</li>
<li>Additional commits viewable in <a
href="https://github.com/tailwindlabs/tailwindcss/commits/v4.2.3/packages/tailwindcss">compare
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
cc790db9f build(deps-dev): Bump the tailwind group across 1 directory with 2 updates (#318)
 package.json   |   4 +-
 pnpm-lock.yaml | 144 ++++++++++++++++++++++++++++-----------------------------
 2 files changed, 74 insertions(+), 74 deletions(-)
```

### Commit 3: `ab494cf`
- **Commit SHA:** `ab494cfdb8e961e3382d6646c8c4dc3d9e00b872`
- **Previous SHA:** `c5d9f1a6ca89a391b032686617eaf8644faf974b`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
feat(foundry): Add session heartbeat and stale node detection (#319)

Fixes task-002-create-heartbeat.md by implementing the session heartbeat
script and workflow.

---
*PR created automatically by Jules for task
[4392356162765776613](https://jules.google.com/task/4392356162765776613)
started by @szubster*

---------

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.foundry/tasks/task-002-create-heartbeat.md`
- `.github/scripts/foundry-heartbeat.test.ts`
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-heartbeat.yml`

#### Diff Summary
```text
ab494cfdb feat(foundry): Add session heartbeat and stale node detection (#319)
 .foundry/tasks/task-002-create-heartbeat.md |   6 +-
 .github/scripts/foundry-heartbeat.test.ts   | 149 +++++++++++++++++
 .github/scripts/foundry-heartbeat.ts        | 238 ++++++++++++++++++++++++++++
 .github/workflows/foundry-heartbeat.yml     |  54 +++++++
 4 files changed, 444 insertions(+), 3 deletions(-)
```

### Commit 4: `0e5ce60`
- **Commit SHA:** `0e5ce601d75d6f1bfc5bcea407bc02499a534847`
- **Previous SHA:** `7ea56e930e511894a6cebe5c59dce03b8bdb4518`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
feat(foundry): implement Resurrection Loop for failed/rejected tasks
```

#### Modified Files
- `.foundry/tasks/task-002-create-heartbeat.md`
- `.foundry/tasks/task-003-resurrection-loop.md`
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-engine.yml`

#### Diff Summary
```text
0e5ce601d feat(foundry): implement Resurrection Loop for failed/rejected tasks
 .foundry/tasks/task-002-create-heartbeat.md  |   2 +-
 .foundry/tasks/task-003-resurrection-loop.md |  19 ++--
 .github/scripts/foundry-heartbeat.ts         | 159 ++++++++++++++++++++++-----
 .github/workflows/foundry-engine.yml         |   7 ++
 4 files changed, 149 insertions(+), 38 deletions(-)
```

### Commit 5: `2b778a8`
- **Commit SHA:** `2b778a89482f889b992efe60ef72cc044738dbc5`
- **Previous SHA:** `7521319c74a7ae50ff28e53826241715913796c3`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
revert: Task 003 accidentally pushed to main
```

#### Modified Files
- `.foundry/tasks/task-002-create-heartbeat.md`
- `.foundry/tasks/task-003-resurrection-loop.md`
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-engine.yml`

#### Diff Summary
```text
2b778a894 revert: Task 003 accidentally pushed to main
 .foundry/tasks/task-002-create-heartbeat.md  |   2 +-
 .foundry/tasks/task-003-resurrection-loop.md |  19 ++--
 .github/scripts/foundry-heartbeat.ts         | 159 +++++----------------------
 .github/workflows/foundry-engine.yml         |   7 --
 4 files changed, 38 insertions(+), 149 deletions(-)
```

### Commit 6: `11388d5`
- **Commit SHA:** `11388d5ab9972003f45e69cba66742d42dd53bb2`
- **Previous SHA:** `2b778a89482f889b992efe60ef72cc044738dbc5`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
feat(foundry): implement Resurrection Loop for failed/rejected tasks (#329)

### Description
This PR implements the **Resurrection Loop** for The Foundry.

### Changes
- **Heartbeat Script**: Added `IN_REVIEW` polling to
`.github/scripts/foundry-heartbeat.ts`.
- **Self-Healing**: Implemented automatic resurrection of tasks with
closed/unmerged PRs back to `READY` status.
- **Workflow Update**: Added `GITHUB_TOKEN` to the orchestration engine
to enable PR status checks.
- **Task Management**: Formally marked Task 002 as completed and Task
003 as completed.

### Motivation
The Foundry needs a self-contained error recovery mechanism. This loop
ensures that rejection by a human or a failure in the Jules session
correctly triggers a re-run without manual intervention.

### Verification
- Dry-run verification performed on Story 002.
- Logged 401 response from GitHub API with dummy token.
- Verified state transitions and IDs clearing via local logic
simulation.
```

#### Modified Files
- `.foundry/tasks/task-002-create-heartbeat.md`
- `.foundry/tasks/task-003-resurrection-loop.md`
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-engine.yml`

#### Diff Summary
```text
11388d5ab feat(foundry): implement Resurrection Loop for failed/rejected tasks (#329)
 .foundry/tasks/task-002-create-heartbeat.md  |   2 +-
 .foundry/tasks/task-003-resurrection-loop.md |  19 ++--
 .github/scripts/foundry-heartbeat.ts         | 159 ++++++++++++++++++++++-----
 .github/workflows/foundry-engine.yml         |   7 ++
 4 files changed, 149 insertions(+), 38 deletions(-)
```

### Commit 7: `a929230`
- **Commit SHA:** `a929230f25dd2b2b51661a31adb65304b3f48919`
- **Previous SHA:** `bb5a6884ec85b5eb715d71cf5897b0d4b2c9f745`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc Foundry system code modification
- **Domain:** foundry

#### Message
```text
Foundry: Autonomous FAILED node resurrection & Heartbeat consolidation (#330)

### Overview
This PR completes the "Self-Healing" capabilities of The Foundry by
extending the Resurrection Loop to handle `FAILED` nodes and
consolidating the heartbeat logic.

### Changes
- **FAILED Node Resurrection**: Updated
`.github/scripts/foundry-heartbeat.ts` to automatically transition nodes
in `FAILED` status back to `READY`, incrementing the `rejection_count`.
This ensures that tasks which crashed or timed out are automatically
re-queued.
- **Workflow Consolidation**: Deleted
`.github/workflows/foundry-heartbeat.yml`. The heartbeat script is now
natively integrated into `.github/workflows/foundry-engine.yml`, which
is more efficient and prevents Git race conditions.
- **Task Sign-off**: Verified that Task 002 and Task 003 are marked as
`COMPLETED`.

### Effect on Story 002
Once merged, the standard hourly run of **The Foundry Engine** will
automatically detect that **Story 002 (Personas)** is currently `FAILED`
and resurrect it to `READY` for a fresh Jules agent to pick up.
```

#### Modified Files
- `.github/scripts/foundry-heartbeat.ts`
- `.github/workflows/foundry-heartbeat.yml`

#### Diff Summary
```text
a929230f2 Foundry: Autonomous FAILED node resurrection & Heartbeat consolidation (#330)
 .github/scripts/foundry-heartbeat.ts    | 10 +++++-
 .github/workflows/foundry-heartbeat.yml | 54 ---------------------------------
 2 files changed, 9 insertions(+), 55 deletions(-)
```

### Commit 8: `0f2e130`
- **Commit SHA:** `0f2e130e2ebaa7f9428531dc02f567cc85ac8b5d`
- **Previous SHA:** `4390329ab29bbe44324144b6ee458a725648a58f`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
📜 Scribe: Document MapGraph traversal logic (#321)

**What**
Added comprehensive JSDoc to `getDistanceToMap` and `getOutdoorMapId` in
`src/engine/mapGraph/gen1Graph.ts`, and logged the corresponding
architectural decisions in `.jules/scribe.md`.

**Why this module needed docs**
The `mapGraph` distance logic relies on pre-computed distances via the
Floyd-Warshall algorithm instead of real-time pathfinding
(BFS/Dijkstra). Furthermore, it relies on indoor maps resolving to their
outdoor parents. Both of these architectural concepts are crucial to
understand when making modifications to prevent regressions in
performance or logic, necessitating permanent "why" documentation.

**Summary of additions**
- Documented O(1) distance lookups via the `dist` property in
`getDistanceToMap`.
- Documented indoor map resolution via the `prnt` property in
`getOutdoorMapId`.
- Added the 2024-05-25 entry in `.jules/scribe.md` to permanently
capture these decisions.

---
*PR created automatically by Jules for task
[6855025864396596405](https://jules.google.com/task/6855025864396596405)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.jules/scribe.md`
- `src/engine/mapGraph/gen1Graph.ts`

#### Diff Summary
```text
0f2e130e2 📜 Scribe: Document MapGraph traversal logic (#321)
 .jules/scribe.md                 | 12 +++++++++++-
 src/engine/mapGraph/gen1Graph.ts | 31 +++++++++++++++++++++++++++----
 2 files changed, 38 insertions(+), 5 deletions(-)
```

### Commit 9: `125acfb`
- **Commit SHA:** `125acfb61b393cb7f2ece8ce8932ab252f54ff43`
- **Previous SHA:** `0f2e130e2ebaa7f9428531dc02f567cc85ac8b5d`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
🎨 Palette: Add tooltips to icon buttons and improve aria-labels (#326)

**What**
Added `title` attributes (tooltips) to several icon-only buttons across
the application (Clear Search, Close Settings, Close Details, Clear
Location Filter). Also added `aria-label` and `title` to the Version
Selector button.

**Why**
Icon-only interactive elements (like an "X" or a generic icon) can be
visually ambiguous for sighted users. Providing a native browser tooltip
on hover via the `title` attribute significantly improves usability and
context without cluttering the UI. Furthermore, ensuring standard
elements have proper `aria-label` and `title` properties ensures better
accessibility for both screen reader users and those navigating with
mice.

**Before/After**
- Users hovering over the X button in Settings, PokemonDetails, Search,
or LocationSuggestions will now see a tooltip like "Close settings" or
"Clear search".
- The version selector button in AppLayout now has an explicit
`aria-label` and `title`.

**Accessibility notes**
- The new tooltips use the standard HTML `title` attribute, safely
providing context on hover.
- Added a new learning to `.jules/palette.md` to establish the pattern
of combining `aria-label` (for screen readers) with `title` (for sighted
hover context) on icon-only interactive elements.

---
*PR created automatically by Jules for task
[3335036102591039134](https://jules.google.com/task/3335036102591039134)
started by @szubster*

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.jules/palette.md`
- `src/components/LocationSuggestions.tsx`
- `src/components/PokemonDetails.tsx`
- `src/components/SearchAndFilters.tsx`
- `src/components/SettingsModal.tsx`

#### Diff Summary
```text
125acfb61 🎨 Palette: Add tooltips to icon buttons and improve aria-labels (#326)
 .jules/palette.md                      | 3 +++
 src/components/LocationSuggestions.tsx | 1 +
 src/components/PokemonDetails.tsx      | 1 +
 src/components/SearchAndFilters.tsx    | 1 +
 src/components/SettingsModal.tsx       | 1 +
 5 files changed, 7 insertions(+)
```

### Commit 10: `cb4c7e6`
- **Commit SHA:** `cb4c7e6ef591c85f146eba3af2d51be83a6cedb1`
- **Previous SHA:** `4fa390f41dfc33831184cd295f48fd52bdd66408`
- **Date:** `2026-04-21`
- **Classification:** Ad-hoc user-facing Dexhelper code modification
- **Domain:** dexhelper

#### Message
```text
🖼️ Canvas: Tactical Assistant Target Lock Layout (#324)

**What:** Redesigned the `AssistantSuggestionCard` to adopt a tactical
"Target Lock" aesthetic, utilizing dashed borders, radar scanlines,
corner crosshairs, and monospaced telemetry fonts. Also updated
`.jules/canvas.md` with an unrecorded past outcome (`Condensed Pokedex
Grid Layout`).

**Why:** To lean into the "snooping" and utility-driven fantasy of a
Pokédex, creating a more cohesive, high-contrast, and thematic
presentation for the Assistant feature rather than a generic UI card.

**Verification:**
- Ran `pnpm lint` and `pnpm test`, with all tests passing.
- Recorded frontend UI snapshot and verified aesthetic layout changes
visually using Playwright UI tests.

**Screenshots:**
- Included before/after representation in recorded `verification.png`.

---
*PR created automatically by Jules for task
[12989970519442137184](https://jules.google.com/task/12989970519442137184)
started by @szubster*

---------

Co-authored-by: google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com>
Co-authored-by: szubster <603853+szubster@users.noreply.github.com>
```

#### Modified Files
- `.jules/canvas.md`
- `src/components/assistant/AssistantSuggestionCard.tsx`

#### Diff Summary
```text
cb4c7e6ef 🖼️ Canvas: Tactical Assistant Target Lock Layout (#324)
 .jules/canvas.md                                   |  6 +++++
 .../assistant/AssistantSuggestionCard.tsx          | 27 ++++++++++++++++++----
 2 files changed, 29 insertions(+), 4 deletions(-)
```


## Evaluation Instructions
As Changelogger, independently inspect the code diffs for this batch by running `git show <sha>` or `git diff 4b11f2e54ae369a5abfbdf83a6bc945b9ecba3d5..cb4c7e6ef591c85f146eba3af2d51be83a6cedb1` in bash. If the clone is shallow (`git rev-parse --is-shallow-repository` returns `true`), run `git fetch --unshallow` first.

Synthesize the technical changes across all commits in this batch:
1. **Grouping / Merging**: Based on your judgment of the diffs, decide whether to group multiple commits into a single changelog entry or release version, split them into separate releases, or merge entries into a previous release header in `CHANGELOG-dexhelper.md`.
2. **Selective Inclusion**: Omit internal/trivial changes that do not warrant a user-facing or system maintainer changelog entry.
3. **Documentation**: Update `README.md` if any commit in the batch alters setup, features, or architecture.
4. **Link References**: If a changelog entry is added, include diff links (e.g. [`1.3.0...1.4.0`](https://github.com/${repo}/compare/4b11f2e...cb4c7e6)) and update link references at the bottom of `CHANGELOG-dexhelper.md`.
5. **No Changes Needed**: If no commits in the batch warrant changelog or README updates, submit an Empty PR.
