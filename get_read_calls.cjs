const fs = require('fs');
const files = fs.readFileSync('calls.txt', 'utf8').split('\n').filter(Boolean).slice(75, 100);
for (const file of files) {
  console.log(file);
}
