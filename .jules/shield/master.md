## Action Taken
Replaced an insecure `Math.random()` call in `src/components/RetroBackground.tsx` with `window.crypto.getRandomValues()`.

## Learnings & Patterns
**Pattern:** Even if pseudo-random generation is only used for UI/visual effects (like scrolling hex data streams), SAST tools will routinely flag `Math.random()` as a high-severity CWE-338 (Use of Cryptographically Weak PRNG) violation.
**Policy Update:** Always default to `window.crypto.getRandomValues` in the browser or `node:crypto` in Node environments, regardless of the security context of the generated value, to maintain zero-warning compliance.

# Shield Security Journal - brace-expansion Vulnerability

**Vulnerability:**
A high-severity DoS vulnerability via unbounded expansion length (GHSA-mh99-v99m-4gvg) was discovered in `brace-expansion < 2.1.3`.

**Action Taken:**
Added a pnpm override in `pnpm-workspace.yaml` for `brace-expansion@<2.1.3` to resolve to `^2.1.3`.

**Key Learnings:**
- In a pnpm workspaces setup, dependency overrides must be configured using the `overrides:` block within `pnpm-workspace.yaml`. The `pnpm.overrides` field in `package.json` is deprecated and ignored by newer versions of pnpm.
- When applying overrides, ensure the resolution string is a valid semver range and preserves major version bounds (e.g. `^2.1.3` instead of `>=2.1.3`) to prevent pulling in breaking changes (like ESM-only updates) that could cause runtime crashes in dependencies.


**Empty PR Policy Execution:** Submitted empty PR as no actionable vulnerabilities found in dependencies or code base.

## Action Taken
Replaced an insecure `Math.random()` call in `src/components/RetroBackground.tsx` with `window.crypto.getRandomValues()`.

## Learnings & Patterns
**Pattern:** Even if pseudo-random generation is only used for UI/visual effects (like scrolling hex data streams), SAST tools will routinely flag `Math.random()` as a high-severity CWE-338 (Use of Cryptographically Weak PRNG) violation.
**Policy Update:** Always default to `window.crypto.getRandomValues` in the browser or `node:crypto` in Node environments, regardless of the security context of the generated value, to maintain zero-warning compliance.

**Vulnerability:**
A high-severity DoS vulnerability via unbounded expansion length (GHSA-mh99-v99m-4gvg) was discovered in `brace-expansion < 2.1.3`.

**Action Taken:**
Added a pnpm override in `pnpm-workspace.yaml` for `brace-expansion@<2.1.3` to resolve to `^2.1.3`.

**Key Learnings:**
- In a pnpm workspaces setup, dependency overrides must be configured using the `overrides:` block within `pnpm-workspace.yaml`. The `pnpm.overrides` field in `package.json` is deprecated and ignored by newer versions of pnpm.
- When applying overrides, ensure the resolution string is a valid semver range and preserves major version bounds (e.g. `^2.1.3` instead of `>=2.1.3`) to prevent pulling in breaking changes (like ESM-only updates) that could cause runtime crashes in dependencies.

During this session, I ran `pnpm audit` and found a vulnerable dependency (`js-yaml`). I created a `.pnpmfile.cjs` hook initially but later opted for `pnpm`'s built-in overrides in `pnpm-workspace.yaml` instead, which cleanly upgraded `js-yaml` from `3.15.0` to `3.15.1`. All tests and audits pass successfully now.

During this session, I replaced `Math.random()` with `globalThis.crypto.getRandomValues()` in `src/components/SearchAndFilters.tsx` to generate a random hex string for visual effect.
I also learned that `window.crypto.getRandomValues()` should be used when purely client-side rendering, but if the component is used in Server-Side Rendering (SSR) environments, `globalThis.crypto.getRandomValues` is a safer cross-environment alternative as `window` might be undefined on the server.
I fixed the CodeQL warning by using a bitwise AND mask instead of the modulo operator.
I also fixed the typescript error by using `(randomValues[i] || 0)` instead of `randomValues[i]!`.





---

## Aggregated from 2026-08-23-00-35-40.md

# Shield Journal Entry: Resolving CWE-209 Raw Error Logging

## Context
During a routine security scan, we observed that `console.error` was logging raw error objects, which could potentially expose sensitive stack traces, paths, or application internals to an attacker who gains access to the client logs (CWE-209 - Generation of Error Message Containing Sensitive Information).

## Discovery
The vulnerability was identified in multiple files:
- `src/components/dashboard/progression/ProgressionTimeline.tsx`: `console.error('Failed to fetch progression history:', error);`
- `src/engine/storage/historyDb.ts`: `console.error('Failed to get most recent save:', error);`
- `src/engine/storage/historyDb.ts`: `console.error('Failed to get previous save:', error);`

## Solution
Instead of logging the entire raw error object, we updated the code to extract only the error message if the caught error is an instance of `Error`, falling back to a generic message otherwise.

The patched code reads:
`console.error('...', error instanceof Error ? error.message : 'Unknown error');`

## Key Learnings
1. **Always sanitize errors in logs:** Prevent the leakage of raw error objects since they may leak internal file paths, module structures, or environment variables.
2. **Handle non-Error exceptions:** When catching errors in TypeScript/JavaScript, the error might not always be an instance of the `Error` object. Therefore, a generic fallback like `'Unknown error'` ensures the logging system behaves predictably.
