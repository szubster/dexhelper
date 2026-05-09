import matter from 'gray-matter';
import * as fs from 'fs';

const filePath = '.foundry/tasks/task-042-068-implement-hall-of-fame-roamers.md';
const fileContent = fs.readFileSync(filePath, 'utf8');
const parsed = matter(fileContent);

let newContent = parsed.content.replace(
  '- [ ] `SaveData` includes `roamingLegendaries`.',
  '- [x] `SaveData` includes `roamingLegendaries`.'
);
newContent = newContent.replace(
  '- [ ] `parseGen2` successfully parses Hall of Fame count for GS and Crystal.',
  '- [x] `parseGen2` successfully parses Hall of Fame count for GS and Crystal.'
);
newContent = newContent.replace(
  '- [ ] `parseGen2` successfully parses the specific map locations of Raikou, Entei, and Suicune for GS and Crystal.',
  '- [x] `parseGen2` successfully parses the specific map locations of Raikou, Entei, and Suicune for GS and Crystal.'
);
newContent = newContent.replace(
  '- [ ] Tests verify correct extraction of both components.',
  '- [x] Tests verify correct extraction of both components.'
);

parsed.data.updated_at = new Date().toISOString().split('T')[0];

const newFile = matter.stringify(newContent, parsed.data);
fs.writeFileSync(filePath, newFile, 'utf8');
console.log('Task updated successfully.');
