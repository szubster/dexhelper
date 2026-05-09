# Sweeper Learnings

- When removing unused imports, ensure that the imports aren't actually used further down in the file.
- If replacing `as Mock` assertions with `vi.mocked()`, partial mock values may fail TypeScript's structural typing checks.
- Avoid using `any` casts or `// biome-ignore lint/suspicious/noExplicitAny` to fix these errors, as it defeats the purpose of code health improvements.
- Instead, use `as unknown as ReturnType<typeof functionName>` to provide safe partial mocks in TypeScript tests.
