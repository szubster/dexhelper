const fs = require('fs');

// update DagContext.tsx to default activeView to board
const path = 'src/components/dashboard/DagContext.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/const \[activeView, setActiveView\] = useState<ViewMode>\('graph'\);/g, `const [activeView, setActiveView] = useState<ViewMode>('board');`);

fs.writeFileSync(path, content);
