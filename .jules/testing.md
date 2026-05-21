# Testing Memory

- To achieve 100% test coverage in Vitest on files fetching data with Dataloader, carefully mock backend services (like `pokeDB` methods) to return exactly what `DataLoader`'s batched load function expects.
- Be extremely cautious with branches that capture thrown Errors vs. resolved instances of the Javascript `Error` class, as Dataloader maps thrown errors inside batched fetch functions back into `Error` objects per item index.
- Always delete temporary scratchpad files (like `.patch`, `.js` scripts) to prevent them from accidentally getting committed as part of a feature branch.
