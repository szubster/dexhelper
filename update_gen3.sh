#!/bin/bash
# Remove old constants from gen3.ts
sed -i '150,155d' src/engine/saveParser/parsers/gen3.ts
sed -i '355,384d' src/engine/saveParser/parsers/gen3.ts
