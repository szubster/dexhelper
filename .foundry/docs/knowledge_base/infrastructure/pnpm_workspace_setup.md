# pnpm Workspace Configuration

The project now uses pnpm workspaces to manage multiple packages.

## Workspace Root
- Path: `/home/tszuba/projects/dexhelper`
- Configuration: `pnpm-workspace.yaml`

## Included Packages
- `.` (Root project)
- `.github/scripts` (Foundry DAG orchestration scripts)

## CI/CD Impact
- GitHub workflows should use `pnpm install` at the root instead of installing dependencies inside individual package directories.
- Use `uses: pnpm/action-setup@v6` to set up pnpm in GitHub Actions.
- Localized `pnpm-lock.yaml` files (e.g., in `.github/scripts`) have been removed in favor of the root lockfile.
