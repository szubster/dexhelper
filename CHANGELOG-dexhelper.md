# Dexhelper Changelog

All notable changes to Dexhelper will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Bump `@vitejs/plugin-react` from 6.1.1 to 6.1.2, `vite` from 8.3.0 to 8.3.4, and `vitest` from 4.1.11 to 5.0.4 in the root directory.

## [0.26.1] - 2026-04-09
### Changed
- Improve filter buttons and target status segmented control accessibility by adopting ARIA roles.
- Optimize AssistantPanel Pokémon name lookup performance by utilizing Record structure instead of Map.

## [0.26.0] - 2026-04-08
### Added
- Add support for trade evolution suggestions in the Assistant engine.

### Changed
- Optimize Assistant API performance by batching and deduplicating ancestor fetch requests.

## [0.25.2] - 2026-04-07
### Changed
- Optimize rendering overhead in `StorageGrid` by grouping Pokémon by location.
- Improve rendering performance in `PokedexGrid` by removing unused shiny set calculations.
- Improve UX by adding an inline two-step confirmation for save deletion in the settings modal.

### Fixed
- Prevent assistant from suggesting redundant evolutions for already owned Pokémon.
- Fix Gen 1 NPC trade data and redundant version-exclusive suggestions, specifically fixing double suggestions in Pokémon Yellow.

## [0.25.1] - 2026-04-06
### Added
- Enhance Assistant algorithm to intelligently suggest in-game NPC trades dynamically based on save file state and collection.

### Changed
- Bump `@tanstack/react-query` to `5.96.2`.

### Fixed
- Fix Pokémon Yellow save detection by analyzing Original Trainer names and checking for definitive Yellow markers.
- Resolve 1-byte offset shift in English Pokémon Yellow saves that corrupted Pokedex data and incorrect map detection.

## [0.25.0] - 2026-04-06
### Added
- Implement mapping for internal map IDs to general area names for Gen 1 and Gen 2, enhancing location display readability.

### Changed
- Optimize performance of Pokemon name lookups and suggestion engine data iterations by using Map data structures, reducing array lookup overhead.
- Add proper ARIA accessibility attributes to interactive elements in the Settings Modal and Bottom Navigation.
- Bump Vite development dependency.

## [0.24.6] - 2026-04-06
### Changed
- Replace `framer-motion` with native CSS animations to improve UI performance and resolve visual test flakiness.
- Improve accessibility for the Living Dex toggle switch by adding proper ARIA attributes, switch role, and focus styles.

### Fixed
- Fix Gen 1 save file parsing to correctly read all 12 PC boxes (instead of just the active box) and accurately display empty boxes in the Storage view.

## [0.24.5] - 2026-04-03
### Changed
- Optimize rendering performance in the Pokédex grid by replacing array lookups with O(1) Set operations.
- Improve accessibility by adding ARIA labels to icon-only buttons across the application.

### Fixed
- Fix map graph distance calculation bug by properly falling back unknown starting locations to Saffron City.

## [0.24.4] - 2026-04-03
### Changed
- Optimize rendering performance in the Pokémon locations view by eliminating redundant array lookups.

## [0.24.3] - 2026-04-03
### Changed
- Optimize StorageGrid rendering performance by replacing O(N*M) array find loops with O(1) Map lookups, significantly mitigating rendering bottlenecks for large datasets.

## [0.24.2] - 2026-04-03
### Fixed
- Fix router base path configuration to use Vite's dynamic BASE_URL environment variable for robust deployments.

## [0.24.1] - 2026-04-03
### Changed
- Optimize PokeAPI requests by implementing React Query caching to deduplicate identical concurrent network calls.

## [0.24.0] - 2026-04-03
### Added
- Add dynamic base path configuration for Vite to support seamless deployment on Cloudflare Pages.

## [0.23.9] - 2026-04-03
### Added
- Improve test coverage and consolidate unit tests for the `decodeGen12String` extraction utility to prevent regressions in Generation 1 and 2 save file parsing.

## [0.23.8] - 2026-04-03
### Changed
- Refactor the suggestion engine by extracting `findAncestors` out of `fetchAssistantApiData` into a top-level helper function `getAncestors` to reduce closure nesting and improve maintainability.

## [0.23.7] - 2026-04-03
### Added
- Add Vitest unit tests for the `pokeapi` wrapper client to guarantee correct network failure handling.

## [0.23.6] - 2026-04-03
### Added
- Add comprehensive unit tests for `getGenerationConfig` to verify Gen 1 fallback behavior for unknown or missing generation IDs.

## [0.23.5] - 2026-04-03
### Changed
- Bump the `playwright` dependency group (including `@playwright/test` and `@playwright/experimental-ct-react`) from 1.59.0 to 1.59.1.

## [0.23.4] - 2026-04-03
### Changed
- Bump `typescript` development dependency from 5.9.3 to 6.0.2.

## [0.23.3] - 2026-04-03
### Changed
- Isolate `useAssistant` hook logic into a dedicated `suggestionEngine` module and remove duplicate Gen 1 constants for a cleaner architecture.

## [0.23.2] - 2026-04-03
### Changed
- Decompose `PokemonDetails` and `AssistantPanel` into smaller, focused sub-components (`AssistantDebugView`, `AssistantSuggestionCard`, `PokemonCatchProbability`, etc.) to improve modularity and maintainability.

## [0.23.1] - 2026-04-03
### Changed
- Refactored module imports to directly consume `engine/` modules, removing legacy `utils/` shims.
- Migrated `ROD_IDS` usage from static assistant data to dynamic generation configuration.

## [0.23.0] - 2026-04-03
### Added
- Implement global Zustand store for centralized application state.
- Engine isolation for game rules mapping and Assistant strategies.
- Implement extensive save parsing enhancements for Gen 1 and Yellow.
- Enhance TypeScript strict typing across data utilities and stores.

## [0.22.0] - 2026-04-02
### Added
- Integrated Playwright component testing and E2E testing framework.

### Changed
- Updated Vitest configuration and replaced JSDOM with Playwright for component tests.

## [0.21.10] - 2026-04-02
### Changed
- Bump `@tanstack/react-query` dependency from 5.96.0 to 5.96.1.

## [0.21.9] - 2026-04-01
### Changed
- Bump `@tanstack/react-query` dependency from 5.95.2 to 5.96.0.

## [0.21.8] - 2026-03-31
### Changed
- Bump `@tanstack/react-router` dependency from 1.168.8 to 1.168.10.

## [0.21.7] - 2026-03-31
### Changed
- Bump `@tanstack/router-vite-plugin` dependency from 1.166.18 to 1.166.27.

## [0.21.6] - 2026-03-30
### Changed
- Bump `vite` development dependency from 8.0.0 to 8.0.2.

## [0.21.5] - 2026-03-30
### Changed
- Bump `vitest` development dependency from 4.1.0 to 4.1.2.

## [0.21.4] - 2026-03-30
### Changed
- Bump `@tanstack/react-query` dependency from 5.95.0 to 5.95.2.

## [0.21.3] - 2026-03-30
### Changed
- Bump `lucide-react` dependency from 0.577.0 to 1.0.1.

## [0.21.2] - 2026-03-23
### Changed
- Bump `@tanstack/router-vite-plugin` dependency from 1.166.12 to 1.166.18.

## [0.21.1] - 2026-03-23
### Changed
- Bump `@tanstack/react-router` dependency from 1.167.4 to 1.168.2.

## [0.21.0] - 2026-03-23
### Added
- Enhance the Pokémon Assistant with debug diagnostics, logging detailed rejection reasons for unobtainable Pokémon (e.g., version exclusivity, missing HoF, or claimed gifts).
- Introduce a developer debug toggle in the Assistant Panel to display raw rejection payloads and logic scores.
- Centralize static NPC in-game trade data for Generation 1 and Generation 2.

## [0.20.0] - 2026-03-23
### Added
- Implement central game configuration registry (`generationConfig.ts`) unifying game-specific features such as themes, sprites, Pokeball types, and mechanics (e.g. Hidden Power, unified Special stat, breeding).

### Changed
- Centralize game generation mapping and refactor components and hooks to dynamically utilize the new config registry, removing scattered manual game version checking.
- Refactor Assistant and data components for a centralized source of truth for items and map slugs.

## [0.19.0] - 2026-03-23
### Changed
- Improve Pokémon details navigation by preserving the origin route (e.g., Pokedex, Storage, or Assistant) via search parameters.

### Fixed
- Fix an issue where the Assistant would display duplicate "Catch Right Here" suggestions when a Pokémon is available in both local and nearby encounters.

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
[0.19.0]: https://github.com/szubster/dexhelper/compare/6ea8ef12be096d313b15f4868e61dbdefd4a26c4...a4e9aec1039af7baa330e437bbff39fe36a1c745
[0.20.0]: https://github.com/szubster/dexhelper/compare/a4e9aec1039af7baa330e437bbff39fe36a1c745...c3633f50a3917c02df8179265ecee582c2bcb3e5
[0.21.0]: https://github.com/szubster/dexhelper/compare/26c46de9206aeb462f3ecd8638e4472b44b58791...b72dce75b94081093c23f96b36a64f284845d643
[0.21.1]: https://github.com/szubster/dexhelper/compare/067c75ac8a1f5636b8a76767bafd1eacde61240c...80809f4058a645e1648f9cd6ba4dee094ae0655e
[0.21.2]: https://github.com/szubster/dexhelper/compare/80809f4058a645e1648f9cd6ba4dee094ae0655e...ae23b902255b90b81ca2ddd582c9462959b07b60
[0.21.3]: https://github.com/szubster/dexhelper/compare/19736ac5285ef7f5e2478fff92a866a7dd7c46de...38365f35e66a5d9341ac5b61663659685fcd11d7

[0.21.4]: https://github.com/szubster/dexhelper/compare/cd452d1a20a4ec28e50784ab967edad0cd1e4fdc...053baf14d34d72aaed552dca136139a989dffac5
[0.21.5]: https://github.com/szubster/dexhelper/compare/2da17e9792cd41167a5846673ffd40321510d7dc...92ae5ee2cddb3c7b1c07b66e353a31f6d9055d11
[0.21.6]: https://github.com/szubster/dexhelper/compare/2243321c7cb2b75fae7093d64c1d81a7d036a3c7...bf732ac8d4de4215017f0348723511bdc40296e1
[0.21.7]: https://github.com/szubster/dexhelper/compare/ee57cbf965fb4b9b7fbf4409086bfc82ecef2b22...86bca891cdbab961269d7985923aa428dff2687f
[0.21.8]: https://github.com/szubster/dexhelper/compare/86bca891cdbab961269d7985923aa428dff2687f...942497a590c67313f7b5f4567cdc182f839aa25f
[0.21.9]: https://github.com/szubster/dexhelper/compare/72a8ba6780d89efe35e83d1873b237f4641b9057...6334dbd01830d3844185f1ef2d3e92ec6d5b910b
[0.21.10]: https://github.com/szubster/dexhelper/compare/6a17b750adfcafcb7aec032ee3e97fa58eedfb31...dce451f55b6e6e31e1e2f7b4bf09ff3c949ad8f3

[0.22.0]: https://github.com/szubster/dexhelper/compare/8bb4419a8419c389c6b36cead2ef6d0b59ed7a53...748a61356bbecf42660c6e2c38a8df5265e7507f

[0.23.0]: https://github.com/szubster/dexhelper/compare/415739935a20abd5d62bffc08f9adf4ca559fcf6...1336859d026c3a33f000009eaf9389ab6d0e5640
[0.23.1]: https://github.com/szubster/dexhelper/compare/1336859d026c3a33f000009eaf9389ab6d0e5640...9fca8ef72fccabc6a4dfb44e2a92f16402b2809a
[0.23.2]: https://github.com/szubster/dexhelper/compare/9fca8ef72fccabc6a4dfb44e2a92f16402b2809a...5dfb95e04548639734fdc9b9e48a683a48b422a9
[0.23.3]: https://github.com/szubster/dexhelper/compare/5dfb95e04548639734fdc9b9e48a683a48b422a9...bd676cb4db66ecc313c0f24e3e354a26457085a8
[0.23.4]: https://github.com/szubster/dexhelper/compare/cef37c945ee740b9537dc8e664d7ccd28af5d60d...c8e8728539f8ed5bb663ae68968a40946c73c35b
[0.23.5]: https://github.com/szubster/dexhelper/compare/c8e8728539f8ed5bb663ae68968a40946c73c35b...034ee21c23bd91854fabd387693e7247b9fce8ee

[0.23.6]: https://github.com/szubster/dexhelper/compare/d67d3464e87381688ecfcf5136c3f299b7c7f79c...7184ba35ce6641a67e1f3003403e22e4d39b5913
[0.23.7]: https://github.com/szubster/dexhelper/compare/7184ba35ce6641a67e1f3003403e22e4d39b5913...5feaa6ef2b2ad4fc2df304b0b2f0ee026b2e70af
[0.23.8]: https://github.com/szubster/dexhelper/compare/5feaa6ef2b2ad4fc2df304b0b2f0ee026b2e70af...f3e1743b567af90ec93b9445ec3ec92ed7eb2952
[0.23.9]: https://github.com/szubster/dexhelper/compare/f3e1743b567af90ec93b9445ec3ec92ed7eb2952...20ca1be20e3522bede6b25bd0589217cbf668385
[0.24.0]: https://github.com/szubster/dexhelper/compare/a6a53c17ebde6858a331450305b6ea43f0474aa2...5617da6f34388d20bbeec8a2b1ff419e5b3b724c
[0.24.1]: https://github.com/szubster/dexhelper/compare/5617da6f34388d20bbeec8a2b1ff419e5b3b724c...6c0ade13ea7ddb818007bad462788077595b34e1
[0.24.2]: https://github.com/szubster/dexhelper/compare/6c0ade13ea7ddb818007bad462788077595b34e1...70b3ca6ea7f9788b3ea04d7a352acb8ad5706bed
[0.24.3]: https://github.com/szubster/dexhelper/compare/70b3ca6ea7f9788b3ea04d7a352acb8ad5706bed...961413c214332bc0ff9e90bfd13630da9a04c67f
[0.24.4]: https://github.com/szubster/dexhelper/compare/961413c214332bc0ff9e90bfd13630da9a04c67f...edbf0c9005b78906051b1bc371acc754b0a466bd
[0.24.5]: https://github.com/szubster/dexhelper/compare/edbf0c9005b78906051b1bc371acc754b0a466bd...0a51a23e9edeb506357e599dd7dcffdbbe75c9eb
[0.24.6]: https://github.com/szubster/dexhelper/compare/18f5e2a12afbc20796f2d70fc895d4ff085cf10c...7389580e7acb3613d2e2f477c5a2a57033325be2
[0.25.0]: https://github.com/szubster/dexhelper/compare/7389580e7acb3613d2e2f477c5a2a57033325be2...a18cf2a547687991de4af3b100e4d45e528ebe19
[0.25.1]: https://github.com/szubster/dexhelper/compare/a18cf2a547687991de4af3b100e4d45e528ebe19...8ed973e2e6c042bd60543dee85e822baeba4f9bf
[0.25.2]: https://github.com/szubster/dexhelper/compare/8ed973e2e6c042bd60543dee85e822baeba4f9bf...a19062bfa5babacd61b75ef13b5115d63c620c81
[0.26.0]: https://github.com/szubster/dexhelper/compare/a19062bfa5babacd61b75ef13b5115d63c620c81...eee0a28dd252701243ddbcb259b987a947d7afb0
[0.26.1]: https://github.com/szubster/dexhelper/compare/eee0a28dd252701243ddbcb259b987a947d7afb0...ae6a6a4361c2085f7d8cf13300045933367ab0f8
