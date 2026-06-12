## 2026-05-11: Updated Foundry Orchestrator Persona Mappings

Resolved an issue where TASK nodes owned by the 'architect' persona were being flagged as invalid.
- Updated `.github/scripts/foundry-orchestrator.ts` to allow 'architect' to own 'TASK' nodes.
- Synchronized `scripts/validate-foundry-schema.ts` with these mapping changes.
- Proactively added 'RESEARCH' node support to the schema validator.
- Added a regression test in `.github/scripts/foundry-orchestrator.test.ts` to verify the new mapping.

## 2026-05-12: Enforcing Acceptance Criteria Checkboxes in Orchestrator Preflight
- The DAG must accurately distinguish between generation (late-binding parent) nodes and execution (leaf) nodes.
- Leaf nodes with `hasUncheckedTasks === true` should NOT be kept perpetually in `PENDING` during the `bypassDispatch` state (when target artifacts exist). Instead, they are considered an invalid completion attempt and are failed directly using `promoteNodeToFailedWithReason(node, 'Merged with unfulfilled acceptance criteria');`.

### Integrating React Flow & Dagre
- **Lesson**: When rendering a DAG with React Flow, if nodes overlap heavily by default, integrating `dagre` for auto-layout is necessary.
- **Pattern**: Extract nodes and edges format from `buildDagGraph`, pass them through `dagre` graph logic to calculate XY positions based on `nodeWidth` and `nodeHeight`, and then supply these absolute positions back to React Flow's `nodes` array.
- **Vite Middleware**: When creating custom Vite plugins to serve local development APIs/data endpoints via `configureServer` middleware, the incoming `req.url` may be stripped or mutated by preceding plugins (like `tanstackRouter`). You often need to check `req.originalUrl` (or use broad `.includes()`) to reliably match custom endpoints.
- **Aesthetic**: Custom React Flow nodes must explicitly override default wrapper styling. Apply `rounded-none`, `border-dashed`, and use `!bg-zinc-x !rounded-none` inside the `<Handle>` classNames to ensure standard nodes map perfectly to the tactical UI requirements.
- **Biome Rule**: In Biome, `lint/complexity/useLiteralKeys` throws errors when using bracket notation (`data['id']`). However, the project's strict `@tsconfig/strictest` often forces bracket notation to access properties typed as `unknown` or `Record<string, unknown>`. If you encounter this conflict, use the inline disable comment `// biome-ignore lint/complexity/useLiteralKeys: TSConfig requires bracket notation` to safely bypass Biome without sacrificing compiler type safety.
### React Flow Filter Integration
- **Pattern**: When dynamically filtering nodes and edges passed to `ReactFlow`, explicitly pass filtered lists using `useMemo`. When dealing with `ReactFlow`'s `node.data`, which often has index signatures, explicitly use bracket notation `node.data['key']` instead of dot notation if TypeScript is configured strictly (`noPropertyAccessFromIndexSignature: true`). To appease Biome's `useLiteralKeys` rule, wrap the line with `// biome-ignore lint/complexity/useLiteralKeys: TSConfig requires bracket notation`.
- **Learning**: Vitest requires explicit generic typing on `vi.fn()` mocks (e.g. `vi.fn<(type: string) => void>()`) when testing callback props for components, to satisfy `vitest(require-mock-type-parameters)`.
Updated generation logic to pull condition_values from PokeAPI to attach bitmasked times. Successfully modified Gen2 strategy to append time-of-day warnings instead of strictly filtering.
For Playwright E2E tests failing due to missing browser binaries or system dependencies in the test environment, explicitly run `pnpm exec playwright install chromium --with-deps` before executing tests.
- Ensure that you accurately handle arrays like pokemonIds and localPids correctly by modifying both of them iteratively if needed to avoid bugs.
- Found out Gen 2 Headbutt/Rock Smash didn't actually require badges internally despite some guides saying so.
- Workaround vitest-browser-react pointer event issues on complex SVGs or wrappers (like ReactFlow) by evaluating the locator directly to the DOM element and calling .click()

## 2026-05-31: Foundry DAG ID Strictness
- **Constraint**: The `parent` and `depends_on` fields in Foundry node frontmatter MUST strictly use Node IDs (e.g., `prd-066-036-time-capsule-validator`).
- **Regression**: Including the `.md` extension (e.g., `prd-066-036-time-capsule-validator.md`) or using full paths (e.g., `.foundry/epics/...`) causes the orchestrator to fail to resolve the dependency graph, resulting in "Parent not found" warnings and blocking node promotion.
- **Verification**: Always run `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --dry-run --strict` to verify DAG integrity after modifying node frontmatter.

## 2026-05-18 - Gen 3 Locations
- The Gen 3 maps define their region mapping string representation inside `region_map_sections.json` within the decomp repo, mapped sequentially. Use this to construct proper lookup lists.

## 2026-05-19: Biome Iterable Callback Return Error
When passing a callback to iteration methods like `forEach`, do not use an implicit return (e.g. `arr.forEach(x => set.delete(x))`). This violates Biome's `lint/suspicious/useIterableCallbackReturn` rule. Use a block statement instead: `arr.forEach(x => { set.delete(x); })`.

## Gen 3 Data Scripts
- When writing or modifying data generation scripts (e.g., mapping formatters), ensure that existing non-derivable values (such as manual Area IDs / `aid`) in the destination file are explicitly loaded and preserved to avoid introducing data regressions.
- When catching errors and the error object is not used, omit the catch binding entirely (e.g., use `catch { ... }` instead of `catch(e)` or `catch(_e)`) to prevent strict `no-unused-vars` linting errors from Biome or ESLint.

## 2026-05-21: pnpm Workspace Root Installations
When adding a dependency to the root of a pnpm workspace (e.g., adding `wrangler` globally for the project deployment scripts), you must explicitly use the `-w` or `--workspace-root` flag (e.g., `pnpm add -D wrangler -w`). Attempting to install without it will result in an `ERR_PNPM_ADDING_TO_ROOT` error, halting the operation.

## 2026-05-21: Package.json Sorting Enforcement
The project enforces strict sorting of `package.json` via the `lint:package-json` script using `sort-package-json`. When manually adding scripts or dependencies using tools like `npm pkg set`, the file may become unsorted, causing `pnpm lint` to fail. Always run `npx sort-package-json package.json` after programmatically modifying `package.json` to ensure the linter passes.

## 2026-05-21: Cloudflare Deployment Strategy (Workers vs Pages)
The CEO/Architect has specified that Cloudflare Pages are already deployed using the Cloudflare-GitHub integration (Inversion of Control), where Cloudflare polls the repository rather than GitHub pushing to Cloudflare via Action/scripts. This is preferred for security and simplicity. Therefore, we should aim to deploy Workers using the same pull-based model (e.g., via wrangler.toml `workers_dev = true` or similar configuration read by the integration) rather than relying on `wrangler pages deploy` or push-based GitHub Actions.

## 2026-05-21: Purpose of Wrangler in a Pull-Based Deployment Model
Even though the project uses Cloudflare's GitHub integration for deployments (Inversion of Control, where Cloudflare polls the repo), the `wrangler` CLI is still a required devDependency. It provides the local emulation environment (`workerd`) necessary to test Cloudflare Workers, Pages, and bindings (like KV or D1) locally during development before committing.

## 2026-05-23
When using the File System Access API in TypeScript projects, you must install `@types/wicg-file-system-access` and explicitly add it to the `types` array in `tsconfig.json` to resolve missing type errors for `window.showOpenFilePicker` and `FileSystemFileHandle`. Additionally, properties like `queryPermission` and `requestPermission` may still not be perfectly typed on `FileSystemFileHandle` by this package, so you may need to use `as any` and suppress the Biome warning (`// biome-ignore lint/suspicious/noExplicitAny`) to compile.

When modifying `transitionNodeToCompleted` in `foundry-heartbeat.ts` to clear `jules_session_id`, be extremely careful with testing. Unit tests will fail if they assert on the presence of `jules_session_id` in `.foundry` files but the type isn't correctly identified, causing it to fall through to `COMPLETED` when it should have been `VERIFYING`, or vice-versa. Additionally, always make sure the frontmatter types match precisely between tests and the new logic you've implemented to ensure thorough testing. Tests mock nodes, meaning any logic relying on data dynamically inferred (like `node.frontmatter.type`) will fail unless the mock explicitly defines that `type` property.


## 2026-06-11: Requirement for Concrete Memory Mapping Before Implementation
When implementing save parser tasks (e.g., Gen 3 berry patches), concrete memory offsets and byte structures (e.g., `SaveBlock` layouts) MUST be provided in the task notes, the PRD, or a related RESEARCH node. If these exact offsets and structural definitions are missing, it is impossible to correctly implement the `DataView` parsing logic. In such cases, a `RESEARCH` node should be spawned to identify and document the offsets, and the implementation task should be failed/aborted until the research is complete. This prevents guessing and potential data corruption.

## Late Binding for Missing Dependencies (2026-06-11)
Based on PR feedback for `task-095-157-gen3-berry-dataview-parsing`, instead of permanently failing tasks that lack explicit data specifications (like exact memory offsets), we should utilize the DAG's late binding capability. We spawn the necessary `RESEARCH` node and dynamically inject it into the current task's `depends_on` array. This suspends the implementation task in the orchestrator until the research is complete, allowing it to gracefully resume instead of dying.
