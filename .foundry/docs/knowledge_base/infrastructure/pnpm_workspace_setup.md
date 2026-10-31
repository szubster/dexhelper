# pnpm Workspace Configuration

The project now uses pnpm workspaces to manage multiple packages.

## Workspace Root
- Path: `/home/tszuba/projects/dexhelper`
- Configuration: `pnpm-workspace.yaml`

## Included Packages
- `.` (Root project)
- `packages/foundry` (Foundry DAG orchestration scripts)

## CI/CD Impact
- GitHub workflows should use `pnpm install` at the root instead of installing dependencies inside individual package directories.
- Use `uses: pnpm/action-setup@v6` to set up pnpm in GitHub Actions.
- Localized `pnpm-lock.yaml` files (e.g., in `packages/foundry`) have been removed in favor of the root lockfile.

## Dependency Management & Tooling (pnpm v12 & Biome v2.6)
- Package manager version is pinned via Corepack to `pnpm@12.16.1` with sha512 hash in `package.json`.
- `pnpm-workspace.yaml` is kept clean without overrides or `ignoreGhsas`, ensuring dependencies remain at their latest upstream releases without artificial version clamping.
- `biome` is updated to `2.6.4` using the `useTailwindSortedClasses` nursery rule and overrides for component factory patterns in test files.
- `pnpm audit --prod --ignore-registry-errors` runs cleanly with 0 vulnerabilities.
