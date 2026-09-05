# Performance Memory

* The performance focus is strictly on analyzing and implementing one measurable performance improvement per run.
* Any optimization should establish a baseline benchmark beforehand to properly quantify the result, and present this in the PR description.
* Avoid redundant and intermediate allocations within high-frequency functions or tight loops, such as avoiding `.flatMap().map()` chains or array creation where explicit `.push()` loops do the same work. O(n) array mapping loops can be replaced by traditional `for` loops for performance gains in TS/JS hot paths.
