# pnpm v11 Migration Memory

## Key Changes
- **Configuration Relocation**: The `pnpm` field in `package.json` is deprecated. All settings must move to `pnpm-workspace.yaml`.
- **.npmrc Migration**: Non-auth/registry settings (like `legacy-peer-deps`) must move from `.npmrc` to `pnpm-workspace.yaml` using camelCase keys (e.g., `legacyPeerDeps: true`).
- **Build Script Permissions**: The `onlyBuiltDependencies` array is replaced by the `allowBuilds` map (`Record<string, boolean>`).
- **Audit Config**: `auditConfig.ignoreCves` is renamed to `auditConfig.ignoreGhsas`.
- **Minimum Release Age**: v11 introduced a default 24h installation delay (`minimumReleaseAge: 1440`). To allow immediate installation of new packages (required for some CI environments), set `minimumReleaseAge: 0`.

## Implementation Details
- **packageManager Field**: Update to pnpm@11.x with proper hash.
- **engines Field**: Update `engines.pnpm` to `>=11.x`.
- **Workspace File**: `pnpm-workspace.yaml` now serves as the primary location for pnpm settings.
