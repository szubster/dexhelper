import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      callback(dirPath);
    }
  });
}

function processFile(filepath: string) {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Skip the store and its tests
  if (filepath.includes('store.ts') || filepath.includes('store.test.ts')) return;

  if (content.includes('import { useStore } from') || content.includes('import {useStore} from')) {
    // Replace imports
    content = content.replace(/import\s*{\s*useStore\s*}\s*from\s*['"][./]+store['"];?/g, "import { useStore } from '@nanostores/react';\nimport * as Store from '../store';");
    content = content.replace(/import \*\ as Store from '\.\.\/store';/g, "import * as Store from '@/src/store';"); // Make it safer with alias

    // Fix generic alias
    content = content.replace(/import \*\ as Store from '\.\.\/store'/g, "import * as Store from '@/src/store'");

    // Replace usages
    content = content.replace(/const (\w+) = useStore\(\(s\) => s\.(\w+)\);/g, (match, varName, propName) => {
      if (['saveData', 'error', 'searchTerm', 'isSettingsOpen', 'isVersionModalOpen'].includes(propName)) {
        return `const ${varName} = useStore(Store.${propName});`;
      } else if (['filters', 'manualVersion', 'isLivingDex', 'globalPokeball'].includes(propName)) {
        return `const $settings = useStore(Store.settings);\n  const ${varName} = $settings.${propName};`;
      } else if (['setSaveData', 'setError', 'setSearchTerm', 'setIsSettingsOpen', 'setIsVersionModalOpen', 'setFilters', 'toggleFilter', 'setManualVersion', 'setIsLivingDex', 'setGlobalPokeball', 'loadSaveFromStorage'].includes(propName)) {
        return `const ${varName} = Store.${propName};`;
      } else if (propName === 'filtersSet') {
        return `const ${varName} = useStore(Store.filtersSet);`;
      }
      return match;
    });

    // Fix multiple settings destructures
    const settingsLines = content.match(/const \$settings = useStore\(Store\.settings\);\n  const (\w+) = \$settings\.(\w+);/g);
    if (settingsLines && settingsLines.length > 1) {
      // Find all settings variables
      const vars: string[] = [];
      let newContent = content;
      newContent = newContent.replace(/const \$settings = useStore\(Store\.settings\);\n  const (\w+) = \$settings\.(\w+);/g, (match, varName) => {
        vars.push(varName);
        return `/* SETTINGS_VAR_${varName} */`;
      });

      if (vars.length > 0) {
         // Add back first one
         newContent = newContent.replace(`/* SETTINGS_VAR_${vars[0]} */`, `const $settings = useStore(Store.settings);\n  const { ${vars.join(', ')} } = $settings;`);
         // remove rest
         vars.slice(1).forEach(v => {
           newContent = newContent.replace(`/* SETTINGS_VAR_${v} */`, '');
         });
      }
      content = newContent;
    }

    // Fix relative paths for Store import
    const depth = filepath.split('/').length - 2; // src/components/File.tsx -> 1
    let storePath = '../store';
    if (depth === 0) storePath = './store';
    else if (depth === 2) storePath = '../../store';

    content = content.replace(/import \* as Store from '.*store';/, `import * as Store from '${storePath}';`);

    fs.writeFileSync(filepath, content);
  }
}

walkDir('./src', processFile);
