# Nurse Joy Journal Entry

- **Issue:** Unsafe `as string` type assertion in `src/engine/saveParser/gen3/storage/parser.ts` when extracting PC box index (`pokemon.storageLocation.split(' ')[1] as string`).
- **Solution:** Replaced `as string` cast with array destructuring (`const [, boxNumStr] = pokemon.storageLocation.split(' ');`) and an explicit string guard check (`if (!boxNumStr) continue;`).
- **Learn:** When parsing structured string descriptions like `"Box N"` in domain models, favor array destructuring combined with guard checks (`if (!val) continue;`) over direct array indexing with `as string` casts. This improves type safety and prevents potential `NaN` calculations or runtime errors if the input string format changes.
