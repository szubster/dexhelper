## 2024-05-18 - [Promise Caching for Concurrent APIs]
**Learning:** The suggestion engine executes loops involving parallel fetching through a centralized `pokeapi.ts` module resulting in duplicate identical request chains across independent API interactions for the same data.
**Action:** Always wrap central data-fetching API functions in a Promise-based request cache mapped by URL to easily deduplicate synchronous fetching requests in React render/query loops.
