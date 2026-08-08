const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/depends_on:\s*\n\s*- \.foundry\/tasks\/(task-\d+-\d+-gen2-dv-extraction-[a-z]+)\.md/, "depends_on:\n  - $1");
  fs.writeFileSync(filePath, content);
}

updateFile('.foundry/tasks/task-401-409-gen2-dv-extraction-impl.md');
updateFile('.foundry/tasks/task-401-410-gen2-dv-extraction-qa.md');
