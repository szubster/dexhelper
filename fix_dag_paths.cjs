const fs = require('fs');
const path = require('path');

const foundryDir = '.foundry';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(foundryDir);

// Regex to find file path dependencies in frontmatter
const foundryPathRegex = /([ :])\.foundry\/[^\s]+\/([^\s/]+)\.md/g;

files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    const parts = content.split('---');
    if (parts.length >= 3) {
        let frontmatter = parts[1];
        const newFrontmatter = frontmatter.replace(foundryPathRegex, '$1$2');
        if (frontmatter !== newFrontmatter) {
            parts[1] = newFrontmatter;
            content = parts.join('---');
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
