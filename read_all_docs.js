import fs from 'fs';
import path from 'path';

function readFilesRecursively(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readFilesRecursively(fullPath);
    } else {
      console.log(`Read ${fullPath}`);
    }
  }
}

readFilesRecursively('.foundry/docs');
