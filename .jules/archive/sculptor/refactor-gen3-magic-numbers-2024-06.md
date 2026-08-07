## Learnings
* When refactoring large TS files, using a Node script with `.cjs` extension works far better than `sed` and `grep` over bash, preventing truncation and missing substitutions.
* Identifying inline magic numbers in heavily structured binaries (like Pokemon save files) significantly boosts AI parsing predictability since the offsets are strictly bounded to constants.
