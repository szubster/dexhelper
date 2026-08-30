const fs = require('fs');
let markdown = fs.readFileSync('.foundry/tasks/task-473-493-gen3-condition-stats-constants.md', 'utf8');

markdown = markdown.replace(/- \[ \] Create or update the relevant Gen 3 constants file/g, '- [x] Create or update the relevant Gen 3 constants file');
markdown = markdown.replace(/- \[ \] Define reusable constants for the EVs & Condition \(E\) substructure/g, '- [x] Define reusable constants for the EVs & Condition (E) substructure');
markdown = markdown.replace(/- \[ \] Define the sizes for each stat as constants./g, '- [x] Define the sizes for each stat as constants.');

fs.writeFileSync('.foundry/tasks/task-473-493-gen3-condition-stats-constants.md', markdown);
