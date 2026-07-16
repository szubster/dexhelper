const fs = require('fs');
const path = require('path');
const storeTestPath = path.join(__dirname, 'src/store.test.ts');
let content = fs.readFileSync(storeTestPath, 'utf8');

content = content.replace(/setItem: vi\.fn\(\)/g, "setItem: vi.fn<() => void>()");
content = content.replace(/removeItem: vi\.fn\(\)/g, "removeItem: vi.fn<() => void>()");

fs.writeFileSync(storeTestPath, content, 'utf8');
