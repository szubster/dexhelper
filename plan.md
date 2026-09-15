Oh! The tests are failing.
```
FAIL  node  src/engine/saveParser/parsers/gen3.test.ts > parseGen3PokeNews > should extract 16 news items correctly
Error: The save file is corrupted or incomplete: Invalid PokeNews struct.
```

Let's look at the test for `parseGen3PokeNews` to see what argument it was passing.
