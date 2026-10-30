# Foundry Changelog

All notable changes to The Foundry engine, DAG orchestrator, and automation system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [1.0.0] - 2026-04-20
### Added
- Implemented the Foundry Orchestration Engine to automate DAG node discovery, promotion, and execution via GitHub Actions.
- Bootstrapped state store and added robust unit tests for the Foundry Orchestrator.

### Changed
- Optimized orchestrator GitHub Action workflows by explicitly running from the repository root and checking out the main branch.

## [0.2.0] - 2026-04-20
### Changed
- Adjusted cron schedules for daily agents in the `jules-agents.yml` workflow.

## [0.1.8] - 2026-04-16
### Changed
- Bumped actions/setup-node from v4 to v6 in CI workflows.
- Bumped pnpm/action-setup from v3 to v6 in CI workflows.

## [0.1.7] - 2026-04-14
### Changed
- Removed redundant file paths from CI workflows.
- Added agent schedule definitions.
- Bumped pnpm/action-setup to v6.
- Bumped actions/upload-pages-artifact to v5.


## [0.1.6] - 2026-04-03
### Changed
- Bumped `actions/setup-node` from v4 to v6 in the Playwright workflow.

## [0.1.5] - 2026-04-03
### Security
- Added explicit `contents: read` permissions to the Playwright workflow to resolve code scanning alerts.

## [0.1.4] - 2026-04-03
### Changed
- Bumped `actions/upload-artifact` from v4 to v7 in the Playwright workflow.

## [0.1.3] - 2026-04-03
### Changed
- Bumped `actions/checkout` from v4 to v6 in the Playwright workflow.

## [0.1.2] - 2026-03-30
### Changed
- Bumped `actions/configure-pages` from v5 to v6 in the deployment workflow.

## [0.1.1] - 2026-03-30
### Changed
- Bumped `actions/deploy-pages` from v4 to v5 in the deployment workflow to ensure compatibility with latest GitHub Pages deployment infrastructure.


[0.1.6]: https://github.com/szubster/dexhelper/compare/99f7f24...6b868d0
[0.1.5]: https://github.com/szubster/dexhelper/compare/c8e8728...4fd4221
[0.1.4]: https://github.com/szubster/dexhelper/compare/2081976...4157399
[0.1.3]: https://github.com/szubster/dexhelper/compare/2a7bab1...2081976
[0.1.2]: https://github.com/szubster/dexhelper/compare/02aa931...cd452d1
[0.1.1]: https://github.com/szubster/dexhelper/compare/38365f3...02aa931

[0.1.7]: https://github.com/szubster/dexhelper/compare/6b868d0...c307662
[0.1.8]: https://github.com/szubster/dexhelper/compare/c307662...98ea107
[0.2.0]: https://github.com/szubster/dexhelper/compare/98ea107...0e9589d
[1.0.0]: https://github.com/szubster/dexhelper/compare/4190489...4b11f2e
