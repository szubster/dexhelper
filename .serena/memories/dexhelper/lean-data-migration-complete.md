The project has been migrated to a leaner data model and the legacy technical stack has been purged. 

- **Data Model**: Pokemon types were removed from the static generation script, schema, and UI components, reducing `pokedata.json` size significantly. 
- **Tech Stack Purge**: Removed `pokenode-ts`, `jsdom`, and `tsx`.
- **Testing Evolution**: Unit tests now run in a native Node environment (no `jsdom`) for maximum performance, with standard DOM guards in `PokeDB.ts`.
- **Tooling Fixes**: Lefthook configuration has been stabilized using `all_files: true` to prevent Biome/TS pathing leaks. 
All changes were verified with `pnpm type-check` and successfully pass.