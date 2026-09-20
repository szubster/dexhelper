# Dexhelper Changelog

All notable changes to Dexhelper will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.18.0] - 2026-03-23
### Added
- Implement expanded save parsing to better handle Gen 1 and Yellow versions.
- Enhance Assistant intelligence with item requirements (e.g. fishing rods and stones) and display layout improvements.
- Improve PWA caching and testing/CI setup.

## [0.17.0] - 2026-03-22
### Added
- Implement Assistant feature enhancements including Obedience Warning logic, Gen 2 time-based forecasting, and dynamic evolution suggestions.

## [0.16.0] - 2026-03-22
### Added
- Implement advanced Assistant intelligence with location grouping, yield-based priority, and Move-based "Fly" optimization.
- Add a dedicated "Trade Required" category with amber styling.
- Polish AssistantPanel UI with categorical grouping and mini-sprite grids.
- Complete migration to TanStack Router.

### Fixed
- Fix Gen 1 version exclusivity logic (e.g. Yellow Weedle / Ekans fixes).
- Fix Pokemon details modal navigation to support history-based back button.

## [0.15.1] - 2026-03-17
### Changed
- Bump `@tanstack/react-router` dependency from 1.167.3 to 1.167.4.

## [0.15.0] - 2026-03-16
### Added
- Establish initial application structure with TanStack Router, global Pokémon data loading, and game-specific data utilities.

## [0.14.0] - 2026-03-16
### Added
- Implement core Pokédex application with routing, state management, and Generation 1/2 save data parsing.

## [0.13.0] - 2026-03-15
### Added
- Implement initial Pokédex application with save file parsing, routing, and interactive UI components.

## [0.12.0] - 2026-03-15
### Changed
- Bump Node.js engine requirement to >=24.0.0 and update GitHub Actions workflows.

## [0.11.0] - 2026-03-15
### Added
- Enhance the Pokédex viewer with `framer-motion` animations for smoother transitions.
- Update UI components to support seamless save file parsing and filtering.

## [0.10.0] - 2026-03-15
### Added
- Enhance Pokemon details UI to display 'Evolves Into' information with direct navigation links.
- Add clickable navigation links for parent Pokemon in breeding information and pre-evolutions.
- Improve Gen 1 game version detection heuristics to distinguish between Red, Blue, and Yellow more accurately.
- Filter out Gen 2+ evolution data and breeding information when viewing Gen 1 save files.


## [0.9.0] - 2026-03-15
### Added
- Implement initial Pokedex application with save file parsing and UI, removing unused dependencies.

## [0.8.0] - 2026-03-15
### Added
- Implement PWA functionality with a custom service worker and integrate React Query.

## [0.7.0] - 2026-03-15
### Added
- Implement core Pokedex functionality with PokeAPI integration, PWA support, and updated dependencies.

## [0.6.0] - 2026-03-15
### Added
- Set up GitHub Actions for CI and GitHub Pages deployment, and configure Vite base path.

## [0.5.0] - 2026-03-15
### Added
- Initialize project structure, core React components, Vite configuration, and core dependencies for Retro Save Reader.

## [0.4.0] - 2026-03-15
### Added
- Initialized project structure and core components for the Retro Save Reader application.

## [0.3.0]
### Added
- Initialized project structure, foundational files, React components, Vite configuration, and core dependencies.

## [0.2.0]
### Added
- Implemented core application layout including save file upload, header navigation, and a mobile-friendly bottom navigation.

[0.6.0]: https://github.com/szubster/dexhelper/compare/ee3b870c4cb8a7e415a12b76986046b2175b2c5c...ad5c67a2a94e052d27b2375415c79311baf2bfb7
[0.5.0]: https://github.com/szubster/dexhelper/compare/0038dbe4b4d9a491fcbebf481af822e6ddcbb550...ee3b870c4cb8a7e415a12b76986046b2175b2c5c
[0.4.0]: https://github.com/szubster/dexhelper/compare/0.3.0...0.4.0
[0.7.0]: https://github.com/szubster/dexhelper/compare/ad5c67a2a94e052d27b2375415c79311baf2bfb7...5dc74ecb97f2ce7914bd98ab158ff1efbd351816
[0.8.0]: https://github.com/szubster/dexhelper/compare/5dc74ecb97f2ce7914bd98ab158ff1efbd351816...49dc139a6eeac048840a8a8f543822a94ccc8cb4
[0.9.0]: https://github.com/szubster/dexhelper/compare/94c083b36583c0b00531233b988d0840eb9d5f6e...a8bd4639d4c7702841582f812eefe73421ec2bd5

[0.10.0]: https://github.com/szubster/dexhelper/compare/a8bd4639d4c7702841582f812eefe73421ec2bd5...f392dbd8d5391441b784959b2fc7e5e2f5eade3f
[0.11.0]: https://github.com/szubster/dexhelper/compare/f392dbd8d5391441b784959b2fc7e5e2f5eade3f...888f3b975ae80fa276832304042b924e60c6a156
[0.12.0]: https://github.com/szubster/dexhelper/compare/888f3b975ae80fa276832304042b924e60c6a156...70ee2e9bf946d3a4ac37cf711d3da663a12718dd
[0.13.0]: https://github.com/szubster/dexhelper/compare/70ee2e9bf946d3a4ac37cf711d3da663a12718dd...2ca9f177ab37f435f7afd05c33782025974f84e2
[0.14.0]: https://github.com/szubster/dexhelper/compare/2ca9f177ab37f435f7afd05c33782025974f84e2...05e43699d7f75bf0e38ed9c309d19a940c8d21d0
[0.15.0]: https://github.com/szubster/dexhelper/compare/92e9008d3d5084b9e7bee265191f83e511b281ad...7041838471914b0cd0bc5e39136edd3792e6efcc
[0.15.1]: https://github.com/szubster/dexhelper/compare/865e8dc78e9e2cfa07f6701918bee3cdcccea213...3dc1da6168d0b17c3b1c564f6e6984d993c70061
[0.16.0]: https://github.com/szubster/dexhelper/compare/3dc1da6168d0b17c3b1c564f6e6984d993c70061...7f582cabcd483967a6a690fcab3c015c8bd0d17d
[0.17.0]: https://github.com/szubster/dexhelper/compare/b98cf70310d80eb9dee58c9e9a05ed9411319a84...49c393b23c3c6d5420ebfc73698b3f54d253a614
[0.18.0]: https://github.com/szubster/dexhelper/compare/49c393b23c3c6d5420ebfc73698b3f54d253a614...6ea8ef12be096d313b15f4868e61dbdefd4a26c4